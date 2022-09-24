/* eslint-disable no-underscore-dangle */
import { useContext } from "./index";
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
//              1           2                3         4                5
// re =      <(Tag) (props=" props" )/> | <(Tag) (props = "props" )>(children)</Tag>
const re = /<([A-Za-z0-9._]*)([^>]*)\/>|<(?<tag>[A-Za-z0-9._]*)(.*?)>(.*?)<\/\k<tag>\s?>/;
const propsRegexp = /(\w+)\s*=\s*((?<quote>["'`]).*?\k<quote>|\d+|\{\{.*?\}\})/g;
const quoteRegexp = /(?<quote>['"`])(.*?)\k<quote>/;
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

function compile(template, state) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = getValue(key, state);
    return typeof value === "string" ? value : `context-id:${setContext(value)}`;
  });
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
      element.addEventListener(eventName, handler);
    }
  });
}

function appendElement(element, parentNode) {
  // console.dir(element);
  parentNode.append(element);
  return element;
}

function render(block, state) {
  const container = new DocumentFragment();
  let parentNode = container;
  let match;
  let element;
  console.log(`%c${block.replace(/\n|\s{2}/g, "")}`, "font-size:9px");
  block = block.replace(/\n|\s{2}/g, "");

  while ((match = block.match(re))) {
    const [rematch, singleTag, singleTagProps, pairedTag, pairedTagProps, children] = match;

    const tag = singleTag || pairedTag;
    const propsString = singleTagProps || pairedTagProps;
    const props = parseProps(propsString, state);

    const Block = components.get(tag);

    if (Block) {
      block = block.replace(rematch, "");
      const component = new Block({ ...props, children });
      parentNode.append(component.elements);
    } else {
      block = block.replace(rematch, children);
      const str = `<${tag} ${propsString} ${singleTag ? "/>" : `></${tag}>`}`;

      element = createElement(str, props);
      addEventHandler(element, props);

      parentNode = appendElement(element, parentNode);
    }
  }

  if (block.length > 0) {
    element = createElement(block);
    parentNode = appendElement(element, parentNode);
  }

  return container;
}

// *********************Component***************************

export default class Component {
  constructor({ template, ...rest }) {
    console.log(`%ccreate ${this.constructor.name}`, "color: blue");
    this.template = template;

    Object.entries(rest).forEach(([key, value]) => {
      if (value && Object.getPrototypeOf(value) === Component) {
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
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      const value = getValue(key, this.state);
      return typeof value === "string" ? value : `context-id:${setContext(value)}`;
    });
  }

  _render() {
    const block = this._compile(this.template);
    this.elements = render(block, this.state);
  }
}
