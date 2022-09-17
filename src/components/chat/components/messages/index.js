import Component from "../../../../utils/component";
import "./index.css";

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = { children: props?.children };
  }

  render() {
    return `
    <div class="chat__messages">
      {{children}}
    </div>`;
  }
}
