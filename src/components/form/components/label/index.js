import Component from "../../../../utils/component";
import template from "./index.tem";
import "./index.css";

export default class Label extends Component {
  constructor(props) {
    super({ ...props, template });
  }
}
