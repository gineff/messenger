import Component from "../../../../utils/component";
import "./index.css";

export default class Messages extends Component {
  render() {
    const { children } = this.state;
    return `
    <div class="chat__messages">
      ${children}
    </div>`;
  }
}
