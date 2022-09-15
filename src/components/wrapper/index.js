import Component from "../../utils/component";
import "./index.css";

export default class Wrapper extends Component {
  constructor(props) {
    super(props);
    const {className, children} = props;
    this.state = {className, children};
  }

  render() {
    return `
    <div class="wrapper {{className}}">
      {{children}}
    </div>`;
  }
} 
