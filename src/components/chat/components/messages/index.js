/* eslint-disable camelcase */
import Component from "../../../../utils/component";
import fetchData from "../../../../utils/fetchData";
import { useEventBus } from "../../../../utils";
import { useContext } from "../../../../utils/context";
import User from "../../../../utils/user";
import template from "./index.tem";
import Message from "../message";
import "./index.css";

const sortByDate = (messages) => messages.sort((cur, prev) => new Date(cur.date) - new Date(prev.date));

const markFirstMessageOfTheDayNThisUser = (messages, thisUserProp) =>
  messages?.map((item, index, array) => {
    const { date, user_id } = item;
    const firstOfTheDay = new Date(date).getDate() !== new Date(array[index - 1]?.date).getDate(date);
    const thisUser = user_id === thisUserProp.user_id;
    return { ...item, firstOfTheDay, thisUser };
  });

const [on] = useEventBus;
export default class Messages extends Component {
  constructor(props) {
    super({ ...props, template, Message });

    const thisUser = useContext(User);

    on("ChatItemSelected", async (chat) => {
      const { id } = chat;
      const data = await fetchData(`/chats/${id}`, { method: "GET" });
      const messages = markFirstMessageOfTheDayNThisUser(sortByDate(data, thisUser), thisUser) || [];

      this.state = { ...this.state, messages, preloaderIsHidden: "hidden", thisUser };
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
