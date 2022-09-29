import Component from "../../utils/component";
import { goToElementHref, useContext, useEventBus } from "../../utils";
import Wrapper from "../../components/wrapper";
import Sidebar, { Header, Body } from "../../components/sidebar";
import Main from "../../components/main";
import { SearchForm, List, Messages, Header as ChatHeader, MessagePanel } from "../../components/chat";
import { ProfileLink } from "../../components/user";
import chats from "../../../static/json/chats.json";
import template from "./index.tem";
import "./index.css";

const [, emit] = useEventBus;
// const [, setContext] = useContext;

export default class ChatPage extends Component {
  constructor(props) {
    super({
      ...props,
      className: "chat-view",
      goToElementHref,
      searchChat: () => alert("chat search"),
      template,
      chats,
      Wrapper,
      Sidebar,
      Main,
      "Sidebar.Header": Header,
      "Sidebar.Body": Body,
      "User.ProfileLink": ProfileLink,
      "Chat.SearchForm": SearchForm,
      "Chat.List": List,
      "Chat.Header": ChatHeader,
      "Chat.Messages": Messages,
      "Chat.MessagePanel": MessagePanel,
    });
  }

  render() {
    
    const ChatItemSelected = (event) => {
      const { target } = event;
      const chatItemSelected = target.closest(".chat-item");
      const id = +chatItemSelected.getAttribute("chat-id");
      const chat = chats.find((el) => el.id === id);
      
      emit("ChatItemSelected", chat);
    };

    this.state = { ...this.state, ChatItemSelected };
    return super.render();
  }
}
