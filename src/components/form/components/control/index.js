import Component, { stringifyProps } from "../../../../utils/component";
import "./index.css";

export default class Control extends Component {
  render() {
    return `<input class="form__control" ${stringifyProps(this.state)}"/>`;
  }
}
