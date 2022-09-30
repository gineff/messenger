/* eslint-disable camelcase */
import Component from "../../utils/component";
import template from "./index.tem";


const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const monthsShort = ["Янв", "Фев", "Мар", "Апр", "Мая", "Июн", "Июл", "Авг", "Сен", "Ноя", "Дек"];
const getWeekDay = (date) => days[date.getDay()];

const getFormatedDate = (date) =>
  `${String(date.getDate()).replace(/0(\d)/, "$1")} ${monthsShort[date.getMonth()]} ${date.getFullYear()}`;
  
const today = new Date();
const todayStr = today.toISOString().slice(0, 10);
export {getFormatedDate}

export default class DateComponent extends Component {
  constructor(props) {
    super({ ...props, template });
  }

  render() {
    const { time } = this.state;

    const date = new Date(time);
    
    const isToday = time.slice(0, 10) === todayStr;
    const isThisWeek = (today - date) / (1000 * 60 * 60 * 24) < 7 && today.getDay() > (date.getDay() || 7);

    const formattedTime = (() => {
      if (isToday) return time.slice(11, 16);
      if (isThisWeek) return getWeekDay(date);
      return getFormatedDate(date);
    })();

    this.state = { ...this.state, formattedTime };
    return super.render();
  }
}
