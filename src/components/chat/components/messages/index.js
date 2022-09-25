import Component from "../../../../utils/component";
import "./index.css";

export default class Messages extends Component {
  constructor(props) {
    super({
      ...props,
      template: "<div class='chat__messages'><div>Выберите чат чтобы отправить сообщение</div></div>",
    });
  }
}
