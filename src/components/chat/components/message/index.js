import Component from "../../../../utils/component";
import MessageTime from "./components/message-time";
import template from "./index.tem";
import "./index.css";

export default class Message extends Component {
  constructor(props) {
    super({ ...props, MessageTime, template });
  }

  render() {
    return super.render();
  }
}
