import Component from "../../utils/component";
import template from "./index.tem";
import "./index.css";

export default class Button extends Component {
  constructor(props) {
    super({ ...props, template });
  }

  render() {
    console.log(this);
    const { title, children } = this.state;
    this.state.title = title || children;
    return super.render();
  }
}
