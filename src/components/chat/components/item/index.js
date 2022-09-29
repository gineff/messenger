import Component from "../../../../utils/component";
import Avatar from "../avatar";
import UnreadCount from "./components/unread-count";
import MessageTime from "./components/message-time";
import template from "./index.tem";
import "./index.css";


export default class Item extends Component {
  constructor(props) {
    super({ ...props, template, "Chat.Avatar": Avatar, UnreadCount, MessageTime });
  }

  render() {
    return super.render();
  }
}
