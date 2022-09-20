import Component from "../../../../utils/component";
import "./index.css";

export default class Header extends Component {
  render() {
    const { children } = this.state;
    return `
    <div class="form__header">
      ${children}
    </div>`;
  }
}
