import Component from "../../../../utils/component";
import MessageTime from "../../../date";
import template from "./index.tem";
import "./index.css";

export default class Message extends Component {
  constructor(props) {
    super({ ...props, MessageTime, template });
  }

  render() {
    const {
      content,
      dayStart,
      file: { path },
    } = this.state;

    const pathDefenision = path ? `src="${path}"` : "";

    this.state = {
      ...this.state,
      dayStart: dayStart ? `first-message="${dayStart}"` : "",
      content: content.replace(/\n/g, "<br>"),
      pathDefenision,
    };
    return super.render();
  }
}
