import Component from "../../../../utils/component";
import Item from "../item";
import template from "./index.tem";
import "./index.css";

export default class List extends Component {
  constructor(props) {
    super({ ...props, template, "Chat.Item": Item });
  }

  render() {
    const { chats, chat } = this.state;
    const { id } = chat ?? {};

    this.state.messages = chats
      ? chats.map((chat) => new Item({ chat, active: chat.id === id, className: "chat__item " }))
      : "";
    return super.render();
  }
}
