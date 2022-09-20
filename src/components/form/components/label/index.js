import Component from "../../../../utils/component";
import "./index.css";

export default class Label extends Component {
  render() {
    const { children } = this.state;
    return `
    <div class="form__label">
      ${children}
    </div>`;
  }
}
