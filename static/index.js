import Login from "../src/pages/login";

const routes = {login: Login}

const render = (Component)=> {
  const component = new Component();
  const html = component.html();
  //console.log("html", html);
  root.innerHTML = html;
}

const route = ()=> {
  const path = document.location.pathname.slice(1);
  render(routes[path] ?? routes.er404);

}

document.addEventListener("DOMContentLoaded", route);

