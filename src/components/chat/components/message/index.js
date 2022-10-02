import Component from "../../../../utils/component";
import MessageTime, { getFormatedDate } from "../../../date";
import template from "./index.tem";
import "./index.css";

export default class Message extends Component {
  constructor(props) {
    super({ ...props, MessageTime, template });
  }

  render() {
    const { content } = this.state;
    this.state = { ...this.state, content: content.replace(/\n/g, "<br>") };
    console.log(this);
    return super.render();
  }
}
