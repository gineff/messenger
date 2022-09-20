import Component from "../../utils/component";
import Header from "./components/header";
import Body from "./components/body";
import Footer from "./components/footer";
import Group from "./components/group";
import Label from "./components/label";
import Control from "./components/control";
import "./index.css";

export default class Form extends Component {
  constructor(props) {
    super({
      ...props,
      "Form.Header": Header,
      "Form.Body": Body,
      "Form.Footer": Footer,
      "Form.Group": Group,
      "Form.Label": Label,
      "Form.Control": Control,
    });
  }

  render() {
    const { children } = this.state;
    return `
    <div class="form">
      ${children}
    </div>`;
  }
}
