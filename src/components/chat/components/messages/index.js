import Component from "../../../../utils/component";
import fetchData from "../../../../utils/fetchData";
import { useEventBus } from "../../../../utils";
// import { useContext } from "../../../../utils/context";
// import { User } from "../../../../utils/user";
import template from "./index.tem";
import Message from "../message";
import "./index.css";

const [on] = useEventBus;
export default class Messages extends Component {
  constructor(props) {
    super({ ...props, template, Message });

    // const user = useContext(User);
    on("ChatItemSelected", (chat) => {
      const { id } = chat;
      fetchData(`/chats/${id}`, { method: "GET" }).then((messages) => {
        console.log(messages);
        this.state = { ...this.state, messages };
        // this.render()
      });
    });
  }

  render() {
    const { messages } = this.state;
    const list = messages ? messages.map((mes) => new Message(mes)) : "";

    this.state = { ...this.state, list };

    return super.render();
  }
}
