/* eslint-disable no-loop-func */
/* eslint-disable no-continue */
/* eslint-disable no-underscore-dangle */
import { useContext, nextId } from "./index";
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
//              1           2                3         4                5
// re =      <(Tag) (props=" props" )/> | <(Tag) (props = "props" )>(children)</Tag>
const re = /<([A-Z][A-Za-z0-9._]+)([^>]*)\/>|<(?<tag>[A-Z][A-Za-z0-9._]+)([^>]*)>(.*?)<\/\k<tag>\s?>|context:(\d+)/;

const propsRegexp = /(\w+)\s*=\s*((?<quote>["'`])(.*?)\k<quote>|context:(\d+))|(\w+)/g;
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
  if (str === undefined) return undefined;
  if (str === "") return "";

  const props = {};
  const matches = str.matchAll(propsRegexp);

  // eslint-disable-next-line no-restricted-syntax
  for (const match of matches) {
    const [, key, , , value, contextId, attribute] = match;
    props[attribute || key] = attribute || (contextId ? getContext(contextId) : value);
  }
  return props;
}

function parseProps(str) {
  return str ? parsePropsFromString(str) : null;
}

function createElementFromString(str) {
  const fragment = document.createElement("template");
  fragment.innerHTML = str;
  return fragment.content;
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

function wrapWithArray(element) {
  return Array.isArray(element) ? element : [element];
}

function createContextElement(context) {
  let nodes;
  const contextValue = getContext(context);
  if (isComponentInstance(contextValue)) {
    const comps = wrapWithArray(contextValue);
    nodes = comps.reduce((arr, component) => {
      arr.push(...component.render());
      return arr;
    }, []);
  } else {
    nodes = wrapWithArray(document.createTextNode(contextValue));
  }
  return nodes;
}

function parseNestedComponents(block) {
  let match;
  const collection = {};

  while ((match = block.match(re))) {
    const [found, singleTag, singleTagProps, pairedTag, pairedTagProps, children, context] = match;
    const id = nextId();
    block = block.replace(found, `<component id="${id}">${children || ""}</component>`);

    if (context) {
      collection[id] = getContext(context);
      // компонент или массив компонентов
    } else {
      const props = parseProps(singleTagProps || pairedTagProps);
      collection[id] = new (components.get(singleTag || pairedTag))({ ...props });
    }
  }

  return [block, collection];
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
      // children = str
      return `context:${setContext(value)}`;
    });
  }

  render() {
    this._render();
    // this.container.forEach((element) => addEventHandler(element, this.state));

    // дублирование на компоненте и див?
    return this.fragment;
  }

  _render() {
    const block = this._compile(this.template).replace(/\n|\s{2}/g, "");
    const [htmlTree, nestedComponents] = parseNestedComponents(block);

    console.log(nestedComponents);
    const fragment = createElementFromString(htmlTree);

    Object.entries(nestedComponents).forEach(([id, component]) => {
      const fragmentElement = fragment.querySelector(`component[id="${id}"]`);

      if (fragmentElement.childNodes.length > 0) {
        component.state = { ...component.state, children: fragmentElement.childNodes };
      }
      const componentFragment = wrapWithArray(component).reduce((container, comp) => {
        try {
          container.append(comp.render());
        } catch (e) {
          console.error(e, comp);
        }
        return container;
      }, new DocumentFragment());

      // createContextElement

      fragmentElement.replaceWith(componentFragment);
      // console.log(component.render());

      // component.render()
    });

    this.fragment = fragment;
  }
}
