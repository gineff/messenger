import Component from "../../../../utils/component";
import Item from "../item";
import "./index.css";

export default class List extends Component {
  constructor(props) {
    super({ ...props, "Chat.Item": Item });
  }

  render() {
    const { chats } = this.state;

    const items = chats.map((el, i) => `<Chat.Item chat = {{chats[${i}]}}></Chat.Item>`).join("");

    return `
    <div class="chat__list">
      <ul>
      ${items}      
      </ul>
    </div>`;
  }
}
