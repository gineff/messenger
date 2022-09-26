import Component from "../../../../utils/component";
import template from "./index.tem";
import "./index.css";

export default class Messages extends Component {
  constructor(props) {
    super({ ...props, template });
  }

  render() {
    console.log("Messages - ", this);
    return super.render();
  }
}
