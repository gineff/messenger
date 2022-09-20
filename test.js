const str =
  '<Wrapper  className="login-form" ><Form><Form.Header>Регистрация</Form.Header><Form.Body></Form.Body><Form.Footer></Form.Footer></Form></Wrapper>';
const re = /<(?<tag>[A-Z][A-Za-z0-9._]*)(.*?)>(.*?)<\/\k<tag>>/gm;

const matches = str.matchAll(re);

console.log(Array.from(matches));
