/* eslint-disable no-continue */
/* eslint-disable no-underscore-dangle */
import { useContext } from "./index";
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
//              1           2                3         4                5
// re =      <(Tag) (props=" props" )/> | <(Tag) (props = "props" )>(children)</Tag>
const re = /<([A-Za-z0-9._]*)([^>]*)\/>|<(?<tag>[A-Za-z0-9._]*)(.*?)>(.*?)<\/\k<tag>\s?>|context:(\d+)/;
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

function appendElement(element, parentNode) {
  parentNode.append(element);
  return element;
}

function isComponent(element) {
  // eslint-disable-next-line no-use-before-define
  return Object.getPrototypeOf(element) === Component;
}

function wrapToArray(element) {
  return Array.isArray(element) ? element : [element];
}

// *********************Component***************************

export default class Component {
  constructor({ template, ...rest }) {
    // console.log(`%ccreate ${this.constructor.name}`, "color: blue");
    this.template = template;

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
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      const value = getValue(key, this.state);

      if (value === undefined) return "";
      if (typeof value === "string") return value;

      return `context:${setContext(value)}`;
    });
  }

  render() {
    this._render();
    return this.container;
  }

  _render() {
    let block = this._compile(this.template);
    this.block = block;
    const container = new DocumentFragment();
    let parentNode = {
      append: (element) => {
        if (this.state) addEventHandler(element, this.state);
        container.append(element);
        return container;
      },
    };

    let match;
    let element;
    // console.log(`%c${block.replace(/\n|\s{2}/g, "")}`, "font-size:9px");
    block = block.replace(/\n|\s{2}/g, "");

    while ((match = block.match(re))) {
      const [rematch, singleTag, singleTagProps, pairedTag, pairedTagProps, children, context] = match;

      const tag = singleTag || pairedTag;
      const propsString = singleTagProps || pairedTagProps;
      const props = parseProps(propsString);

      const Block = components.get(tag);

      if (Block) {
        block = block.replace(rematch, "");
        const component = new Block({ ...props, children });
        parentNode.append(component.render());
        continue;
      }

      if (context) {
        block = block.replace(rematch, "");
        const comps = wrapToArray(getContext(context));
        const nodes = comps.map((component) => component.render());
        parentNode.append(...nodes);
        continue;
      }

      block = block.replace(rematch, children);
      const str = `<${tag} ${propsString} ${singleTag ? "/>" : `></${tag}>`}`;

      element = createElement(str, props);
      if (props) addEventHandler(element, props);

      parentNode = appendElement(element, parentNode);
    }

    if (block.length > 0) {
      element = createElement(block);
      parentNode = appendElement(element, parentNode);
    }

    this.container = container;
  }
}
