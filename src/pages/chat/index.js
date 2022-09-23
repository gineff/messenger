import Component from "../../utils/component";
import { useContext, useEventBus } from "../../utils";
import Wrapper from "../../components/wrapper";
import Sidebar, { Header, Body } from "../../components/sidebar";
import Main from "../../components/main";
import { SearchForm, List, Messages, Header as ChatHeader, MessagePanel } from "../../components/chat";
import { ProfileLink } from "../../components/user";
import chats from "../../../static/json/chats.json";
import "./index.css";

const [on, emit] = useEventBus;
const [, setContext] = useContext;

export default class ChatPage extends Component {
  constructor(props) {
    super({
      ...props,
      className: "chat-view",
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
    const { className, chat } = this.state;

    on("onSearchSubmit", (chatName) => {
      console.log(chatName);
    });

    on("chatSelect", (chat) => {
      this.state = { ...this.state, chat };
      this.renderSelf();
    });

    return `
    <Wrapper className="${className}">
      <Sidebar>
        <Sidebar.Header>
          <User.ProfileLink />
          <Chat.SearchForm />
        </Sidebar.Header>
        <Sidebar.Body>
          <Chat.List chats={{${setContext(chats)}}}/>
        </Sidebar.Body>
      </Sidebar>
      <Main >
        <Chat.Header />
        <Chat.Messages />
        <Chat.MessagePanel />
      </Main> 
    </Wrapper>`;
  }
}
