import Component from "../../utils/component";
import "./index.css";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = { children: props?.children };
  }

  render() {
    return `
    <div class="form__body">
      {{children}}
    </div>`;
  }
}
