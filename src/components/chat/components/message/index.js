import Component from "../../../../utils/component";
import MessageTime from "../../../date";
import template from "./index.tem";
import "./index.css";

export default class Message extends Component {
  constructor(props) {
    super({ ...props, MessageTime, template });
  }

  render() {
    const { content, dayStart, file } = this.state;

    console.log(this);
    this.state = {
      ...this.state,
      hasFile: Boolean(file),
      dayStart: dayStart ? `first-message="${dayStart}"` : "",
      content: content.replace(/\n/g, "<br>"),
    };
    return super.render();
  }
}
