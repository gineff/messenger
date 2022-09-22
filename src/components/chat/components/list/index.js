import Component from "../../../../utils/component";
import { wrapFunction, useContext } from "../../../../utils";
import Item from "../item";
import "./index.css";

const setAtive = (id) => {
  const active = document.querySelector(".chat__item.active");
  if (active) active.classList.remove("active");
  const newActive = document.querySelector(`.chat__item[data-id="${id}"]`);
  if (newActive) newActive.classList.add("active");
};

export default class List extends Component {
  constructor(props) {
    super({ ...props, "Chat.Item": Item });
  }

  render() {
    const { chats, triggerChatChange } = this.state;
    const [, setContext] = useContext;
    const triggerChatSelect = (id) => {
      triggerChatChange();
      setAtive(id);
    };

    const items = chats
      .map(
        (el, i) =>
          `<Chat.Item className="chat__item" triggerChatSelect={{${setContext(triggerChatSelect)}}}
           chat = {{chats[${i}]}}></Chat.Item>`
      )
      .join("");

    return `
    <div class="chat__list" >
      <ul>
      ${items}      
      </ul>
    </div>`;
  }
}
