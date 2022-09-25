import Component from "../../utils/component";
import "./index.css";

export default class Main extends Component {
  constructor(props) {
    super({ ...props, template: "<div class='main'>{{children}}</div>" });
  }
}
