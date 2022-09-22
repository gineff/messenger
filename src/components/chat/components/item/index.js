/* eslint-disable camelcase */
import Component from "../../../../utils/component";
import { wrapFunction } from "../../../../utils";
import Avatar from "../avatar";
import "./index.css";

const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const monthsShort = ["Янв", "Фев", "Мар", "Апр", "Мая", "Июн", "Июл", "Авг", "Сен", "Ноя", "Дек"];
const getWeekDay = (date) => days[date.getDay()];

const getFormatedDate = (date) =>
  `${String(date.getDate()).replace(/0(\d)/, "$1")} ${monthsShort[date.getMonth()]} ${date.getFullYear()}`;
const today = new Date();
const todayStr = today.toISOString().slice(0, 10);

export default class Item extends Component {
  constructor(props) {
    super({ ...props, "Chat.Avatar": Avatar });
  }

  render() {
    const { chat, className, triggerChatSelect } = this.state;

    const {
      id,
      title,
      unread_count,
      avatar,
      last_message: {
        content,
        time,
        user: { login },
      },
    } = chat;
    this.state = { ...this.state, avatar };

    const date = new Date(time);
    const isToday = time.slice(0, 10) === todayStr;
    const isThisWeek = (today - date) / (1000 * 60 * 60 * 24) < 7 && today.getDay() > (date.getDay() || 7);

    const formattedTime = () => {
      if (isToday) return time.slice(11, 16);
      if (isThisWeek) return getWeekDay(date);
      return getFormatedDate(date);
    };

    const handleSelectChatItem = () => {
      triggerChatSelect(id)
    };

    return `
    <div data-id = "${id}" class="${className} chat-item" onclick={{${wrapFunction(handleSelectChatItem)}}}>
      <Chat.Avatar className="chat-item__avatar" image={{avatar}} />
      <div class="chat-item__last-message-detials">
        <div>
          <div class="chat-item__title">${title}</div>
          <div class="chat-item__last-message-time">${formattedTime()}</div>
        </div>
        <div>
          <div class="chat-item__last-message-content">${content}</div>
          <div class="chat-item__last-message-detials-unread-count">${unread_count}</div>
        </div>
    </div>`;
  }
}
