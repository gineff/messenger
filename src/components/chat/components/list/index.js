import Component from "../../../../utils/component";
import { useContext } from "../../../wrapper";
import "./index.css";

export default class List extends Component {
  render() {
    const context = useContext();
    console.log("Component", Component);

    const { data } = context;

    const { children } = this.state;
    return `
    <div class="chat__list">
      ${children}
    </div>`;
  }
}
