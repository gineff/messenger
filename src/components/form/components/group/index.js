import Component from "../../../../utils/component";
import "./index.css";

export default class Group extends Component {
  render() {
    const { children } = this.state;
    return `
    <div class="form__group">
      ${children}
    </div>`;
  }
}
