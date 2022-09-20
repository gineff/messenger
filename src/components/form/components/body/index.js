import Component from "../../../../utils/component";
import "./index.css";

export default class Body extends Component {
  render() {
    const { children } = this.state;
    return `
    <div class="form__body">
      ${children}
    </div>`;
  }
}
