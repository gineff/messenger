import Component from "../../../../utils/component";
import "./index.css";

export default class Messages extends Component {
  render() {
    const {dataUpdate} = this.state; 
    return `
    <div class="chat__messages">
      <div>Выберите чат чтобы отправить сообщение</div>
    </div>`;
  }
}
