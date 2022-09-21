/* eslint-disable camelcase */
import Component from "../../../../utils/component";
import Avatar from "../avatar";
import "./index.css";

export default class Item extends Component {
  constructor(props) {
    super({ ...props, "Chat.Avatar": Avatar });
  }

  render() {
    const { chat } = this.state;

    console.log(this.state);
    const {
      title,
      unread_count,
      avatar,
      last_message: {
        content,
        time,
        user: { login },
      },
    } = chat;
    this.state = { ...this.state, avatar };

    return `
    <div class="chat__item chat-item">
      <Chat.Avatar className="chat-item__avatar" image={{avatar}} />
      <div class="chat-item__middle-block">
        <div class="chat-item__title">${title}</div>
        <div class="chat-item__last-message-content">${content}</div>
      </div>
      <div class="chat-item__last-message-detials">
        <div class="chat-item__last-message-time">${time}</div>
        <div class="chat-item__last-message-detials-unread-count">${unread_count}</time>
      </div>
    </div>`;
  }
}
