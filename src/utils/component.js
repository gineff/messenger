import { useContext, uid, stringifyProps } from "./index";
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
const propsRegexp = /(\w+)\s*=\s*((?<quote>["'`]).*?\k<quote>|\d+|\{\{.*?\}\})/g;
const quoteRegexp = /(?<quote>['"`])(.*?)\k<quote>/;
const components = {};
const [getContext] = useContext;

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

function fillPropsFromState(messyProps) {
  return Object.fromEntries(
    Object.entries(messyProps).map(([key, template]) => {
      const match = template.match(/\{\{(.*?)\}\}/);
      if (match) {
        const data = getContext(match[1].trim());
        if (data !== undefined) {
          return [[key], data];
        }
        console.error(`переменная ${key} не определена в context`);
      }
      return [[key], template.trim().replace(quoteRegexp, "$2")];
    })
  );
}

function getTagRegExp() {
  //         1           2                3         4                5
  // re = <(Tag) (props=" props" )/> | <(Tag) (props = "props" )>(children)</Tag>
  return /<([A-Z][A-Za-z0-9._]*\b)([^>]*)\/>|<(?<tag>[A-Z][A-Za-z0-9._]*)(.*?)>(.*?)<\/\k<tag>\s?>/;
}

function parseProps(str) {
  const messyProps = str ? parsePropsFromString(str) : null;
  // console.log("messyProps", messyProps);
  const props = messyProps ? fillPropsFromState(messyProps) : {};
  // console.log("props", props);

  return props;
}

export { stringifyProps };

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
    const re = getTagRegExp();
    let match;
    const nestedComponents = {};

    // eslint-disable-next-line no-cond-assign
    while ((match = template.match(re))) {
      const id = uid();
      const [rematch, singleTag, singleTagProps, pairedTag, pairedTagProps, children] = match;

      template = template.replace(rematch, `<embed id="${id}">`);

      const props = parseProps(singleTagProps || pairedTagProps);
      const NestedComponent = this.getComponentByTagName(singleTag || pairedTag);
      const nestedComponent = new NestedComponent({ ...props, children: children?.trim() });
      nestedComponents[id] = nestedComponent;
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
      embeded.replaceWith(value.element);
    });

    this.element = temp.content;
  }
}
