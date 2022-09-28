import Component from "../../../../utils/component";
import "./index.css";

export default class Avatar extends Component {
  constructor(props) {
    super({ ...props, template: "<div class='chat__avatar {{className}}'></div>" });
  }
}
