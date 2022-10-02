import Component from "../../../../utils/component";
import fetchData from "../../../../utils/fetchData";
import { useEventBus } from "../../../../utils";
import { useContext } from "../../../../utils/context";
import User from "../../../../utils/user";
import template from "./index.tem";
import Message from "../message";
import "./index.css";

const sortByDate = (messages) => messages.sort((cur, prev) => new Date(cur.date) - new Date(prev.date));

const markFirstMessageOfTheDay = (messages) =>
  messages?.map((item, index, array) =>
    new Date(item.date).getDate() !== new Date(array[index - 1]?.date).getDate(item.date)
      ? { ...item, firstMessageOfTheDay: true }
      : item
  );

const [on] = useEventBus;
export default class Messages extends Component {
  constructor(props) {
    super({ ...props, template, Message });

    // const user = useContext(User);
    // console.log(user);

    on("ChatItemSelected", async (chat) => {
      const { id } = chat;
      const data = await fetchData(`/chats/${id}`, { method: "GET" });
      const messages = markFirstMessageOfTheDay(sortByDate(data)) || [];

      this.state = { ...this.state, messages, preloaderIsHidden: "hidden" };
      this.render();
    });
  }

  render() {
    const { messages } = this.state;
    const list = messages ? messages.map((mes) => new Message(mes)) : "";
    this.state = { ...this.state, list };

    return super.render();
  }
}
