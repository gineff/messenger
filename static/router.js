import Login from "../src/pages/login";
import Register from "../src/pages/register";
import Er404 from "../src/pages/er404";

const routes = {
  login: Login,
  register: Register,
  404: Er404
};
const render = (Component)=> {
  const component = new Component();
  const html = component.html();
  document.root.innerHTML = html;
};
function route() {
  const path = document.location.pathname.slice(1);

  render(routes[path] ?? routes[404]);
}

export{route}
