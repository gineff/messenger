import { useContext, nextId, stringifyProps } from "./index";
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
//              1           2                3         4                5                  6
// re =      <(Tag) (props=" props" )/> | <(Tag) (props = "props" )>(children)</Tag> | {{contextId}}
const re = /<([A-Za-z0-9._]*)([^>]*)\/>|<(?<tag>[A-Za-z0-9._]*)(.*?)>(.*?)<\/\k<tag>\s?>|\{\{(\d+)\}\}/;
const propsRegexp = /(\w+)\s*=\s*((?<quote>["'`]).*?\k<quote>|\d+|\{\{.*?\}\})/g;
const quoteRegexp = /(?<quote>['"`])(.*?)\k<quote>/;
const components = {};
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

function setComponentByTagName(tag, component) {
  components[tag] = component;
}

function getComponentByTagName(tag) {
  return components[tag];
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

export default class Component {
  constructor(props) {
    Object.entries(props).forEach(([key, value]) => {
      if (value && Object.getPrototypeOf(value) === Component) {
        setComponentByTagName(key, value);
      } else {
        this.setState(key, value);
      }
    });
    this.compileTemplate();
  }

  state = {};

  elements = [];

  setState(key, value) {
    this.state[key] = value;
  }

  createElements(template) {
    let match;
    const elements = [];
    const i = 1;

    // eslint-disable-next-line no-cond-assign
    while ((match = template.match(re))) {
      const [rematch, singleTag, singleTagProps, pairedTag, pairedTagProps, children, contextId] = match;

      template = template.replace(rematch, "");

      if (contextId) {
        const component = getContext(contextId);
        const componentsArray = Array.isArray(component) ? component : [component];
        componentsArray.forEach((comp) => {
          elements.push(...comp.elements);
        });

        // eslint-disable-next-line no-continue
        continue;
      }

      const tag = singleTag || pairedTag;
      const propsString = singleTagProps || pairedTagProps;
      const props = parseProps(propsString, this.state);

      if (isHTMLTag(tag)) {
        const temp = document.createElement("template");
        temp.innerHTML = singleTag ? `<${tag} ${propsString} />` : `<${tag} ${propsString}></${tag}>`;

        if (children) {
          const childs = this.createElements(children);
          temp.content.firstElementChild.append(...childs);
        }

        elements.push(temp.content);
        // eslint-disable-next-line no-continue
        continue;
      }

      const component = new (getComponentByTagName(tag))({ ...props, children: children?.trim() });
      elements.push(...component.elements);
    }

    if (!match && template.length > 0) {
      const temp = document.createElement("template");
      temp.innerHTML = template;
      elements.push(temp.content);
    }

    return elements;
  }

  compileTemplate() {
    const template = this.render()
      .trim()
      .replaceAll(/[\n\r]/g, "");

    this.elements.push(...this.createElements(template));

    console.log(this);
  }
}
