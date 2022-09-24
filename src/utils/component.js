import { useContext, nextId, stringifyProps } from "./index";
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
//              1           2                3         4                5                  6
// re =      <(Tag) (props=" props" )/> | <(Tag) (props = "props" )>(children)</Tag> | {{contextId}}
const re = /<([A-Za-z0-9._]*)([^>]*)\/>|<(?<tag>[A-Za-z0-9._]*)(.*?)>(.*?)<\/\k<tag>\s?>|\{\{(\d+)\}\}/;
const propsRegexp = /(\w+)\s*=\s*((?<quote>["'`]).*?\k<quote>|\d+|\{\{.*?\}\})/g;
const quoteRegexp = /(?<quote>['"`])(.*?)\k<quote>/;
const components = new Map();
const [getContext] = useContext;

function getValue(path, obj) {
  const keys = path.split(".");
  let result = obj;

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    const match = key.match(/^(\w+)\[(\d+)\]$/);
    if (match) {
      result = result[match[1]][match[2]];
    } else {
      result = result[key];
    }
  }
  return result;
}

function parsePropsFromString(str) {
  if (str === undefined || !str?.trim()) return undefined;
  const props = {};
  const matches = str.matchAll(propsRegexp);

  // eslint-disable-next-line no-restricted-syntax
  for (const match of matches) {
    props[match[1]] = (match[4] || match[2])?.trim();
  }
  return props;
}

function fillPropsFromState(messyProps, state) {
  return Object.fromEntries(
    Object.entries(messyProps).map(([key, template]) => {
      const match = template.match(/\{\{(.*?)\}\}/);
      if (match) {
        const data = parseFloat(match[1]) ? getContext(match[1]) : getValue(match[1], state);
        if (data !== undefined) {
          return [[key], data];
        }
        console.error(`переменная ${key} не определена в context`);
      }
      return [[key], template.trim().replace(quoteRegexp, "$2")];
    })
  );
}

function parseProps(str, state) {
  const messyProps = str ? parsePropsFromString(str) : null;
  // console.log("messyProps", messyProps);
  const props = messyProps ? fillPropsFromState(messyProps, state) : {};
  // console.log("props", props);

  return props;
}

function isHTMLTag(tag) {
  return tag[0] === tag[0].toLowerCase();
}

// *********************Component***************************

export default class Component {
  constructor({ template, ...rest }) {
    console.log(`%ccreate ${this.constructor.name}`, "color: blue");
    this.template = template ?? this.template;

    Object.entries(rest).forEach(([key, value]) => {
      if (value && Object.getPrototypeOf(value) === Component) {
        components.set(key, value);
      } else {
        this.setState(key, value);
      }
    });
    this.render();
  }

  state = {};

  elements = [];

  setState(key, value) {
    this.state[key] = value;
  }

  createElements(template) {
    template = template.replace(/\n|\s{2}/g, "");
    let match;
    const elements = [];
    let i = 2;
    // eslint-disable-next-line no-cond-assign
    while ((match = template.match(re)) && i--) {

      const [rematch, singleTag, singleTagProps, pairedTag, pairedTagProps, children, templateBlock] = match;
      console.log(i, match);

      template = template.replace(rematch, "");
      const tag = singleTag || pairedTag;
      const propsString = singleTagProps || pairedTagProps;
      const props = parseProps(propsString, this.state);

      /*
      if (templateBlock) {
        console.log("templateBlock", templateBlock);
        const component = getValue(templateBlock);

        // const component = getContext(contextId);

        const componentsArray = Array.isArray(component) ? component : [component];
        componentsArray.forEach((comp) => {
          elements.push(...comp.elements);
        });

        // eslint-disable-next-line no-continue
        continue;
      }
*/

      if (isHTMLTag(tag)) {
        const temp = document.createElement("template");
        temp.innerHTML = singleTag ? `<${tag} ${propsString} />` : `<${tag} ${propsString}></${tag}>`;

        if (childElements) {
          temp.content.firstElementChild.append(...childElements);
        }

        elements.push(temp.content);
        // eslint-disable-next-line no-continue
        continue;
      }

      try {
        const component = new (components.get(tag))({ ...props, children: childElements });
        elements.push(...component.elements);
      } catch (e) {
        console.error(`Ошибка при создании ${tag}`, e);
      }

      
    }

    if (!match && templateStr.length > 0) {
      const temp = document.createElement("template");
      temp.innerHTML = templateStr;
      elements.push(temp.content);
    }

    return elements;
  }

  compileTemplate() {
    this.elements.push(...this.createElements(this.template));
  }

  template = `<div">
    {{children}}
  </div>`;

  render() {
    console.log(`%crender ${this.constructor.name}`, "color: blue");
    this.elements.push(...this.createElements(this.template));
  }
}
