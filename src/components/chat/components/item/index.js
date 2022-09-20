import Component from "../../../../utils/component";
import "./index.css";

export default class List extends Component {
  render() {
    const { children } = this.state;
    return `
    <div class="chat__list">
      ${children}
    </div>`;
  }
}
