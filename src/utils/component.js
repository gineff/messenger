/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-escape */
const propsRegexp = /(\w+)\s?=\s?(\d+|(?<quote>['"`])(.*?)\k<quote>)/gm;

function getValue(obj, path, defaultValue) {
  const keys = path.split(".");
  let result = obj;

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    result = result[key];

    if (result === undefined) {
      return defaultValue;
    }
  }

  return result ?? defaultValue;
}

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function parsePropsFromString(str) {
  if (str === undefined) return undefined;

  const props = {};
  const matches = str.matchAll(propsRegexp);

  // eslint-disable-next-line no-restricted-syntax
  for (const match of matches) {
    props[match[1]] = (match[4] || match[2])?.trim();
  }

  return props;
}

function stringifyProps(props, keys = false) {
  return Object.entries(props)
    .reduce((prev, [key, value]) => {
      if ((keys && !keys.include(key)) || value === undefined) {
        return prev;
      }

      if (typeof value === "function") {
        return `${prev}${key}="{{${key}}}" `;
      }

      return `${prev}${key}="${value}"`;
    }, "")
    .trim();
}

export { stringifyProps };

export default class Component {
  state = {};

  get componentsKeys() {
    return Object.entries(this.state).reduce((prev, [key, value]) => {
      if (value && Object.getPrototypeOf(value) === Component) {
        prev.push(key);
      }
      return prev;
    }, []);
  }

  html() {
    const template = this.compileTemplate();
    const html = this.renderNestedComponents(template);

    return html;
  }

  render() {
    return "<div></div>";
  }

  renderNestedComponents(template) {
    for (const key of this.componentsKeys) {
      const singleTagComponentRegExp = `<${key}([^>]*)\/>`; // <Component props={{props}}/>
      const pairedTagcomponentRegExp = `<${key}([^>]*)\>(.*?)<\/${key}>`; // <Component props={{props}}>{{children}}</Component>
      const re = new RegExp(
        `${singleTagComponentRegExp}|${pairedTagcomponentRegExp}`,
        "gi"
      );
      const matches = template.matchAll(re);

      for (const match of matches) {
        const props = parsePropsFromString(match[1] || match[2]) ?? {};

        if (match[3]) {
          [, , , props.children] = match;
        }

        const NestedComponent = this.state[key];
        const html = new NestedComponent(props).html();
        // eslint-disable-next-line no-param-reassign
        template = template.replace(match[0], html);
      }
    }

    return template;
  }

  compileTemplate() {
    let template = this.render()
      .trim()
      .replaceAll(/[\n\r]/g, "");
    const matches = template.matchAll(/\{\{(.*?)\}\}/gi);

    for (const match of matches) {
      const data = getValue(this.state, match[1]?.trim());
      let replacer = data;

      if (typeof data === "function") {
        const fid = `func${uid()}`;
        window[fid] = function eventHandler(element) {
          data(element);
        };
        replacer = `${fid}(this)`;
      }

      template = template.replace(new RegExp(match[0], "gi"), replacer);
    }

    return template;
  }
}
