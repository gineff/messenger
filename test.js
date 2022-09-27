const str =
  '<Wrapper  className="login-form" ><Form><Form.Header>Регистрация</Form.Header><Form.Body></Form.Body><Form.Footer></Form.Footer></Form></Wrapper>';
const re = /<(?<tag>[A-Z][A-Za-z0-9._]*)(.*?)>(.*?)<\/\k<tag>>/gm;

const matches = str.matchAll(re);

console.log(Array.from(matches));

if (components.has(tag)) {
  element = new (components.get(tag))({ ...props, children }).render();
} else if (context) {
  element = renderContextElement(context);
} else if (singleTag || childrenIsPureHtml(children)) {
  element = createElement(all);
} else {
  element = createElement(all.replace(children, ""));
  const child = new Component({ ...props, template: children }).render();
  element.append(...child);
}
