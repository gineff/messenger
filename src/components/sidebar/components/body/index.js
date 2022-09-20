import Component from "../../../../utils/component";
import "./index.css";

export default class Body extends Component {
  render() {
    const { children } = this.state;
    return `
    <div class="sidebar__body">${children}</div>`;
  }
}
