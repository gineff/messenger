import Component from "../../utils/component";
import Messages from "./components/messages";
import List from "./components/list";
import SearchForm from "./components/search_form";
import "./index.css";

export { Messages, List, ProfileLink, SearchForm };

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Messages,
      List,
      SearchForm,
      children: props.children,
    };
  }

  render() {
    return `
    <div>{{children}}</div>`;
  }
}
