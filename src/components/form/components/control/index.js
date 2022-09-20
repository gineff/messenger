import Component from "../../../../utils/component";
import { stringifyProps, wrapFunction } from "../../../../utils";
import "./index.css";

export default class Control extends Component {
  render() {
    const { onblur, ...restProps } = this.state;

    return `<input class="form__control" ${stringifyProps(restProps)} onblur="${wrapFunction(onblur)}"/>`;
  }
}
