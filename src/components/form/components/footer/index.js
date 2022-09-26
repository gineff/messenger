import Component from "../../../../utils/component";
import template from "./index.tem";

export default class Footer extends Component {
  constructor(props) {
    super({ ...props, template });
  }

  render() {
    console.log(this);
    return super.render();
  }
}
