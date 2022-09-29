/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import Component from "../../../../utils/component";
import Avatar from "../avatar";
import UnreadCount from "./components/unread-count";
import MessageTime from "./components/message-time";
import template from "./index.tem";
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
    super({ ...props, template, "Chat.Avatar": Avatar, UnreadCount, MessageTime });
  }

  render() {
    return super.render();
  }
}
