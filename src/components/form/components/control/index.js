import Component, { stringifyProps } from "../../../../utils/component";
import "./index.css";

export default class Control extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    return `<input class="form__control" ${stringifyProps(this.state)}"/>`;
  }
}
