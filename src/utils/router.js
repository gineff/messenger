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

function render(Comp) {
  const component = new Comp();
  const root = document.getElementById("root");
  root.innerHTML = "";
  const result = component.render();
  root.append(result);
}

export default function route() {
  const path = document.location.pathname.slice(1);
  if (path.slice(0, 7) === "static/") return;
  render(routes[path] ?? routes[404]);
}
