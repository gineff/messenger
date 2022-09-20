import Component from "../../utils/component";
import "./index.css";


export default class Wrapper extends Component {
  render() {
    const { children, className } = this.state;

    return `
    <div class="wrapper ${className}">
      ${children}
    </div>`;
  }
}
