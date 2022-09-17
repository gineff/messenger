import Component from "../../utils/component";
import "./index.css";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { children: props?.children };
  }

  render() {
    return `
    <main class="main">{{children}}</main>`;
  }
}
