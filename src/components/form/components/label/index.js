import Component from "../../../../utils/component";
import "./index.css";

export default class Label extends Component {
  constructor(props) {
    super(props);
    this.state = {children: props?.children};
  }

  render() {
    return `
    <label class="form__label">
      {{children}}
    </label>`;
  }
} 
