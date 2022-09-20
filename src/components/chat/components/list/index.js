import Component from "../../../../utils/component";
import "./index.css";

export default class List extends Component {
  render() {
    const { children, data } = this.state;
    console.log("data", data);

    return `
    <div class="chat__list">
      ${children}
    </div>`;
  }
}
