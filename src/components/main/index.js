import Component from "../../utils/component";
import "./index.css";

export default class Main extends Component {
  render() {
    const {children} = this.state;
    return `
    <main class="main">${children}</main>`;
  }
}
