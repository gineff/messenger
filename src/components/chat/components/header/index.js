import Component from "../../../../utils/component";
import Avatar from "../avatar";
import Button from "../../../button";
import { useEventBus } from "../../../../utils";
import "./index.css";

const [on] = useEventBus;

export default class Header extends Component {
  constructor(props) {
    super({ ...props, Button, "Chat.Avatar": Avatar });

    on("chatSelect", (chat) => {
      this.state = { ...this.state, chat };
      const element = this.renderElement();
      const chatHeader = document.querySelector(".chat__header");
      if (chatHeader) chatHeader.replaceWith(element);
    });
  }

  render() {
    const { chat } = this.state;
    const visible = Boolean(chat);

    let content = "";
    if (visible)
      content = `<Chat.Avatar className = "chat-header__avatar" image=${chat.avatar}/>
      <div class="chat-header__title">${chat.title}</div>
      <Button className="chat-header__menu" />`;

    return `
    <div class="chat__header chat-header ${visible ? "" : "hide"}" >
      ${content}
    </div>`;
  }
}
