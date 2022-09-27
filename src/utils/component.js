/* eslint-disable no-continue */
/* eslint-disable no-underscore-dangle */
import { useContext } from "./index";
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
//              1           2                3         4                5
// re =      <(Tag) (props=" props" )/> | <(Tag) (props = "props" )>(children)</Tag>
const re = /<([A-Za-z0-9._]+)([^>]*)\/>|<(?<tag>[A-Za-z0-9._]+)([^>]*)>(.*)<\/\k<tag>\s?>|context:(\d+)/g;
const propsRegexp = /(\w+)\s*=\s*((?<quote>["'`])(.*?)\k<quote>|\d+|context:(\d+))/g;
const components = new Map();

const eventMap = {
  onClick: "click",
  onBlur: "blur",
};

const [getContext, setContext] = useContext;

function getValue(path, obj) {
  const keys = path.trim().split(".");
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
    const [, key, , , value, contextId] = match;
    props[key] = contextId ? getContext(contextId) : value;
  }
  return props;
}

function parseProps(str) {
  return str ? parsePropsFromString(str) : null;
}

function createElement(str) {
  const fragment = document.createElement("template");
  fragment.innerHTML = str;
  // console.log(str, " --------------- ", fragment.content.firstChild.outerHTML);
  return fragment.content.firstChild;
}

function addEventHandler(element, props) {
  Object.entries(props).forEach(([key, handler]) => {
    if (typeof handler !== "function") return;

    const eventName = eventMap[key];
    if (eventName) {
      element.addEventListener(eventName, handler, { capture: true });
    }
  });
}

function isComponent(element) {
  // eslint-disable-next-line no-use-before-define
  return Object.getPrototypeOf(element) === Component;
}

function isComponentInstance(element) {
  // eslint-disable-next-line no-use-before-define
  return element instanceof Component || element[0] instanceof Component;
}

function isPrimitive(element) {
  return Object(element) !== element;
}

function wrapToArray(element) {
  return Array.isArray(element) ? element : [element];
}

function renderContextElement(context) {
  let nodes;
  const contextValue = getContext(context);
  if (isComponentInstance(contextValue)) {
    const comps = wrapToArray(contextValue);
    nodes = comps.reduce((arr, component) => {
      arr.push(...component.render());
      return arr;
    }, []);
  } else {
    nodes = wrapToArray(document.createTextNode(contextValue));
  }
  return nodes;
}

// *********************Component***************************

export default class Component {
  constructor({ template, tag, ...rest }) {
    this.template = template || `<${tag}>{{${rest?.children}}}</${tag}>`;

    Object.entries(rest).forEach(([key, value]) => {
      if (value && isComponent(value)) {
        components.set(key, value);
      } else {
        this.setState(key, value);
      }
    });
  }

  state = {};

  elements = [];

  setState(key, value) {
    this.state[key] = value;
  }

  _compile(template) {
    if (!template) console.error(this.constructor.name, " отсутствует шаблон");

    return template.replace(/\{\{([A-Za-z0-9._-]+)\}\}/g, (match, key) => {
      const value = getValue(key, this.state);

      if (value === undefined) return "";
      if (isPrimitive(value)) return value;

      return `context:${setContext(value)}`;
    });
  }

  render() {
    this._render();
    this.container.forEach((element) => addEventHandler(element, this.state));

    // дублирование на компоненте и див?
    return this.container;
  }

  _render() {
    this.block = this._compile(this.template).replace(/\n|\s{2}/g, "");
    this.container = [];
    let element;
    const matches = this.block.matchAll(re);

    for (const match of matches) {
      console.log(match);
      const [all, singleTag, singleTagProps, pairedTag, pairedTagProps, children, context] = match;
      const tag = singleTag || pairedTag;
      const props = parseProps(singleTagProps || pairedTagProps);

      if (components.has(tag)) {
        element = new (components.get(tag))({ ...props, children }).render();
      } else {
        element = context ? renderContextElement(context) : createElement(all.replace(children, ""));

        if (children) {
          const child = new Component({ ...props, template: children }).render();
          element.append(...child);
        }
      }

      this.container.push(...wrapToArray(element));
    }
  }
}
