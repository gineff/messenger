import Component from "../../../../utils/component";
import "./index.css";

export default class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {children: props?.children};
  }

  render() {
    return `
    <div class="form__group">
      {{children}}
    </div>`;
  }
} 
