function getValue(obj, path, defaultValue) {

  const keys = path.split('.');

  let result = obj;
  for (let key of keys) {
      result = result[key];

      if (result === undefined) {
          return defaultValue;        
      }
  }

  return result ?? defaultValue; 
}  

function uid() {
  return Math.random().toString(16).slice(2)+Date.now().toString(16)
}

function dataIsFunction(data) {
  return typeof data === "function";
}

const propsRegexp = /(\w+)\s?=\s?((\d+)|'(.*?)'|"(.*?)"|`(.*?)`)/gm;
const propsRegexp2 = /(\w+)\s?=\s?(\d+|'.*?'|".*?"|`.*?`)/gm;

function parsePropsFromString(str) {
  if(str === undefined) return undefined;
  
  const props = {};
  const matches = str.matchAll(propsRegexp);

  for (const match of matches) {
    //console.log("match", match)
    //props[match[1]] = match[2];
    props[match[1]] = match[3] || match[4] || match[5] || match[6];
  }
  return props;
}

export default class Component {
  
  constructor(context) {

  }

  state = {};

  get componentsKeys() {
    return Object.entries(this.state).reduce((prev, [key, value])=> {
      if(value?.__proto__ === Component) {
        prev.push(key)
      }
      return prev
    }, []);
  }

  html () {
    const template = this.compileTemplate(); console.log(1,  this.constructor.name, template)
    const html = this.renderNestedComponents(template); console.log(2,  this.constructor.name, html)
    return html;
  }

  render () {
    return "<div></div>";
  }

  renderNestedComponents(template) {
    for(const key of this.componentsKeys) {
      const singleTagComponentRegExp = `<${key}\s*([^>]*)\/>`;   //<Component props={{props}}/>
      const pairedTagcomponentRegExp = `<${key}\s*([^>]*)\>(.+)<\/${key}>`; //<Component props={{props}}>{{children}}</Component>
      const re = new RegExp(singleTagComponentRegExp + `|` + pairedTagcomponentRegExp, "gi");
      const matches = template.matchAll(re);

      for(const match of matches) {
        /* Array
         [0] element
         [1] singleTagComponent props
         [2] pairedTagComponent props
         [3] pairedTagComponent children
         */
        const props = parsePropsFromString( match[1] || match[2] );
        if(match[3]) {
          props.children = match[3];
        }

        const NestedComponent = this.state[key];
        const html = new NestedComponent(props).html();
        template = template.replace(match[0], html);
        //new RegExp(match[0], "gi") не экранирует скобки в 'func(), а нужно func\(\)'

      }
    }
    return template;
  } 

  compileTemplate () {
    let template = this.render().trim().replaceAll(/[\n\r]/g,"");
    const matches = template.matchAll(/\{\{(.*?)\}\}/gi);

    for(const match of matches) {
      const data = getValue(this.state, match[1]?.trim());
      let replacer = data;

      if(typeof data === "function"){
        const fid = "func"+uid();
        window[fid] = function() {data()};
        replacer = `${fid}()`;
      }

      template = template.replace(new RegExp(match[0], "gi"), replacer);
    }
    return template;
  }
}