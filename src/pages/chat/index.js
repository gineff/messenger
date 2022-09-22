import Component from "../../utils/component";
import { useContext, useEventBus } from "../../utils";
import Wrapper from "../../components/wrapper";
import Sidebar, { Header, Body } from "../../components/sidebar";
import Main from "../../components/main";
import { SearchForm, List, Messages } from "../../components/chat";
import { ProfileLink } from "../../components/user";
import chats from "../../../static/json/chats.json";
import "./index.css";

export default class ChatPage extends Component {
  constructor(props) {
    super({
      ...props,
      Wrapper,
      Sidebar,
      Main,
      "Sidebar.Header": Header,
      "Sidebar.Body": Body,
      "User.ProfileLink": ProfileLink,
      "Chat.SearchForm": SearchForm,
      "Chat.List": List,
      "Chat.Messages": Messages,
    });
  }

  render() {
    const [, setContext] = useContext;
    const [on, emit] = useEventBus;


    on("onSearchSubmit", (chatName)=> {console.log(chatName)})

    on("chatChange", (id) => {
      const messages = [1, 2, 3];
      emit("messagesUpdate", messages);
    });


    return `
    <Wrapper className="chat-view">
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
        <Chat.Messages />
      </Main> 
    </Wrapper>`;
  }
}
