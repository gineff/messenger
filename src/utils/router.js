import Login from "../pages/login";
import Register from "../pages/register";
import Er404 from "../pages/er404";
import Chat from "../pages/chat";

const routes = {
  login: Login,
  register: Register,
  chat: Chat,
  404: Er404,
};

function render(Component) {
  const component = new Component();
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.appendChild(component.element);
}

export default function route() {
  const path = document.location.pathname.slice(1);
  render(routes[path] ?? routes[404]);
}
