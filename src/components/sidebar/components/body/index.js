import Component from "../../../../utils/component";
import "./index.css";

export default class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return `
    <div class="sidebar__body"></div>`;
  }
}