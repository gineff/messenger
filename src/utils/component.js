import { useContext, nextId, stringifyProps } from "./index";
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
//         1           2                3         4                5                  6
// re = <(Tag) (props=" props" )/> | <(Tag) (props = "props" )>(children)</Tag> | {{contextId}}
const re = /<([A-Z][A-Za-z0-9._]*\b)([^>]*)\/>|<(?<tag>[A-Z][A-Za-z0-9._]*)(.*?)>(.*?)<\/\k<tag>\s?>|\{\{(\d+)\}\}/;
const re2 = /<([A-Za-z0-9._]*)([^>]*)\/>|<(?<tag>[A-Za-z0-9._]*)(.*?)>(.*?)<\/\k<tag>\s?>|\{\{(\d+)\}\}/;
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

export default class Component {
  constructor(props) {
    Object.entries(props).forEach(([key, value]) => {
      if (value && Object.getPrototypeOf(value) === Component) {
        this.setComponentByTagName(key, value);
      } else {
        this.setState(key, value);
      }
    });
    this.compileTemplate();
  }

  state = {};

  setState(key, value) {
    this.state[key] = value;
  }

  // eslint-disable-next-line class-methods-use-this
  setComponentByTagName(tag, NestedComponent) {
    components[tag] = NestedComponent;
  }

  // eslint-disable-next-line class-methods-use-this
  getComponentByTagName(tag) {
    return components[tag];
  }

  replaceNestedComponents(template) {
    let match;
    const nestedComponents = {};

    // eslint-disable-next-line no-cond-assign
    while ((match = template.match(re))) {
      const id = nextId();
      const [rematch, singleTag, singleTagProps, pairedTag, pairedTagProps, children, contextId] = match;

      template = template.replace(rematch, `<embed id="${id}">`);

      if (contextId) {
        nestedComponents[id] = getContext(contextId);
      } else {
        const props = parseProps(singleTagProps || pairedTagProps, this.state);
        const NestedComponent = this.getComponentByTagName(singleTag || pairedTag);
        const nestedComponent = new NestedComponent({ ...props, children: children?.trim() });
        nestedComponents[id] = nestedComponent;
      }
    }

    return [template, nestedComponents];
  }

  compileTemplate() {
    const template = this.render()
      .trim()
      .replaceAll(/[\n\r]/g, "");
    const [embededTemplate, nestedComponents] = this.replaceNestedComponents(template);

    const temp = document.createElement("template");
    temp.innerHTML = embededTemplate;

    Object.entries(nestedComponents).forEach(([key, value]) => {
      const embeded = temp.content.querySelector(`embed[id="${key}"]`);
      embeded.replaceWith(
        Array.isArray(value)
          ? value.reduce((prev, cur) => {
              prev.append(cur.element);
              return prev;
            }, new DocumentFragment())
          : value.element
      );
    });

    this.element = temp.content;
  }

  renderSelf() {
    this.compileTemplate();
    const { className } = this.state;
    document.querySelector(`.${className}`).replaceWith(this.element);
  }
}
