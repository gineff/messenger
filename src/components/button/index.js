import Component from "../../utils/component";
import "./index.css";

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props?.title,
      onclick: props?.onclick,
      variant: props?.variant,
      className: props?.className,
      href: props?.href,
      type: props?.type,
    };
  }

  render() {
    return `
    <button type={{type}} href="{{href}}" class="button button_{{variant}} {{className}}" onclick="{{onclick}}">
      {{title}}
    </button>`;
  }
}
