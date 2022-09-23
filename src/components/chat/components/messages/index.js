import Component from "../../../../utils/component";
import { useEventBus } from "../../../../utils";
import "./index.css";

const [on] = useEventBus;


export default class Messages extends Component {
  render() {
    on("messagesUpdate", (messages) => {
      if (!messages) return;
      const element = document.querySelector(".chat__messages");
      element.innerHTML = messages.map((el, i) => `<li>${i}</li>`).join("");
    });

    return `
    <div class="chat__messages">
      <div>Выберите чат чтобы отправить сообщение</div>
    </div>`;
  }
}
