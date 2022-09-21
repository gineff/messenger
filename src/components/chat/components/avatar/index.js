import Component from "../../../../utils/component";
import "./index.css";

export default class Avatar extends Component {
  render() {
    const { image, className } = this.state;

    return `
    <div class="chat__avatar ${className}">
      
    </div>`;
  }
}
