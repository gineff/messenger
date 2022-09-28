import Component from "../../utils/component";
import Messages from "./components/messages";
import List from "./components/list";
import SearchForm from "./components/search_form";
import MessagePanel from "./components/message-panel";
import Header from "./components/header";
import "./index.css";

export { Messages, List, Header, SearchForm, MessagePanel };

export default class Chat extends Component {
  constructor(props) {
    super({
      ...props,
      Messages,
      List,
      Header,
      SearchForm,
      MessagePanel,
      template: "<div class='chat'>{{children}}</div>",
    });
  }
}
