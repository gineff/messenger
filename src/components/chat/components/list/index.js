import Component from "../../../../utils/component";
import { useContext, useEventBus } from "../../../../utils";
import Item from "../item";
import "./index.css";

const [on] = useEventBus;
const [, setContext] = useContext;
/*
const setAtive = (id) => {
  const active = document.querySelector(".chat__item.active");
  if (active) active.classList.remove("active");
  const newActive = document.querySelector(`.chat__item[data-id="${id}"]`);
  if (newActive) newActive.classList.add("active");
};
*/


export default class List extends Component {
  constructor(props) {
    super({ ...props, "Chat.Item": Item });

    on("chatSelect", ({ id }) => {
      // setAtive(id);
    });
  }

  
  render() {
    const { chats, chat } = this.state;
    const { id } = chat ?? {};
    const items = chats.map((chat) => new Item({ chat, active: chat.id === id, className: "chat__item " }));

    return `
    <div class="chat__list">
      {{${setContext(items)}}}      
    </div>`;
  }
}
