import Component from "../../../../utils/component";
import { stringifyProps, wrapFunction } from "../../../../utils";
import "./index.css";

export default class Control extends Component {
  render() {
    const { onblur, className, ...restProps } = this.state;

    return `<input class="form__control ${className}" ${stringifyProps(restProps)} onblur="${wrapFunction(onblur)}"/>`;
  }
}
