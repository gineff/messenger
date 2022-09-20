import Component from "../../utils/component";
import "./index.css";

export default class Button extends Component {
  render() {
    const { type, href, variant, className, title, clickHandler } = this.state;

    return `
    <button type="${type}" href="${href}" class="button button_${variant} ${className}" onclick=${clickHandler}>
      ${title}
    </button>`;
  }
}
