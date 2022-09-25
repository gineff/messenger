/* eslint-disable camelcase */
import Component from "../../../../utils/component";
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
    const { chat } = this.state;
    const {
      last_message: { time },
    } = chat;

    const date = new Date(time);
    const isToday = time.slice(0, 10) === todayStr;
    const isThisWeek = (today - date) / (1000 * 60 * 60 * 24) < 7 && today.getDay() > (date.getDay() || 7);

    const formattedTime = (() => {
      if (isToday) return time.slice(11, 16);
      if (isThisWeek) return getWeekDay(date);
      return getFormatedDate(date);
    })();

    this.state = { ...this.state, formattedTime };

    return `<div data-id = "{{chat.id}}" class="{{className}} chat-item">
    <Chat.Avatar className="chat-item__avatar" image={{chat.avatar}} />
    <div class="chat-item__last-message-detials">
    <div>
      <div class="chat-item__title">{{chat.title}}</div>
      <div class="chat-item__last-message-time">{{formattedTime}}</div>
    </div>
    <div>
      <div class="chat-item__last-message-content">{{chat.last_message.content}}</div>
      <div class="chat-item__last-message-detials-unread-count">{{chat.unread_count}}</div>
    </div>
  </div>`;
  }
}
