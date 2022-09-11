function get(obj, path, defaultValue) {
  const keys = path.split('.');

  let result = obj;
  for (let key of keys) {
      result = result[key];

      if (result === undefined) {
          return defaultValue;        
      }
  }

  return result ?? defaultValue; // "??" — [оператор нулевого слияния](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) (не поддерживается старыми браузерами, для них нужен полифилл)
} 


export default class Templator {
    TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
    COMPONENT_REGEXP = /<><>/gi;

    constructor(template) {
      this._template = template;
    }
  
    compile(ctx) {
      const v1 = /<[A-Z][a-z]+\s*[^<>]*\s*\/>/;
      const v2 =/<[A-Z][a-z]+\s*(.*?)>(.*?)<\/[A-Z][a-z]*>/;
      const v3 =/{{(.*?)}}/;
      //<Wrapper props={{someVal}}/>
      //return this._compileTemplate(ctx);
    }

    //рекурсия
    /*
    match <UpperCase>(children)</UpperCase>
    
    
    */

    _compileTemplate = (ctx) => {
        let tmpl = this._template;
        let key = null;
        const regExp = this.TEMPLATE_REGEXP;

            // Важно делать exec именно через константу, иначе уйдёте в бесконечный цикл
            while ((key = regExp.exec(tmpl))) {
                if (key[1]) {
                    const tmplValue = key[1].trim();
                    // get — функция, написанная ранее в уроке
                    const data = get(ctx, tmplValue);
                    tmpl = tmpl.replace(new RegExp(key[0], "gi"), data);
                }
            }

            return tmpl;
    }
} 