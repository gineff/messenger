import Component from "../../../../utils/component";
import "./index.css";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {children: props?.children};
  }

  render() {
    return `
    <div class="form__header">
      {{children}}
    </div>`
  }
} 
