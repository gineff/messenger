import Component from "../../../../utils/component";
import "./index.css";

export default class List extends Component {
  render() {
    const { data } = this.state;

    const items = data.map((el) => `<li>${el}</li>`).join("");
    return `
    <div class="chat__list">
      <ul>
      ${items}
      </ul>
    </div>`;
  }
}
