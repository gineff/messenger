import Component from "../../../../utils/component";
import Avatar from "../avatar";
import Button from "../../../button";
import template from "./index.tem";
import "./index.css";


export default class Header extends Component {
  constructor(props) {
    super({ ...props, Button, "Chat.Avatar": Avatar, template });
  }

  render() {
    const { chat } = this.state;
    const chatIsSelected = Boolean(chat);

    this.state.content = chatIsSelected
      ? `<Chat.Avatar className = "chat-header__avatar" image={{chat.avatar}}/>
    <div class="chat-header__title">{{chat.title}}</div>
    <Button className="chat-header__menu" />`
      : "";

    return super.render();
  }
}
