import Component from "../../utils/component";
import { wrapFunction, stringifyProps } from "../../utils";
import "./index.css";

export default class Button extends Component {
  render() {
    const { className, title, variant, children, clickHandler, ...rest } = this.state;

    return `
    <button  
    class="button ${variant ? `button_${variant}` : ""} ${className || ""}" 
    ${clickHandler ? `onclick="${wrapFunction(clickHandler)}"` : ""}
    ${stringifyProps(rest)}>
      ${children || title || ""}
    </button>`;
  }
}
