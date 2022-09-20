import Component from "../../utils/component";
import { wrapFunction } from "../../utils";
import "./index.css";

export default class Button extends Component {
  render() {
    const { type, href, variant, className, title, clickHandler, children } = this.state;

    return `
    <button type="${type}" href="${href}" class="button button_${variant} ${className}" onclick="${wrapFunction(
      clickHandler
    )}">
      ${children || title}
    </button>`;
  }
}
