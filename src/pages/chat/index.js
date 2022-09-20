import Component from "../../utils/component";
import { useContext } from "../../utils";
import Wrapper from "../../components/wrapper";
import Sidebar, { Header, Body } from "../../components/sidebar";
import Main from "../../components/main";
import { SearchForm, List, Messages } from "../../components/chat";
import { ProfileLink } from "../../components/user";
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

    const [,setContext] = useContext;
    const chats = [1,2,3];

    const onSearchSubmit = (element)=> {
      console.log("element", element);
    }

    return `
    <Wrapper className="chat-view">
      <Sidebar>
        <Sidebar.Header>
          <User.ProfileLink />
          <Chat.SearchForm onSearchSubmit={{${setContext(onSearchSubmit)}}} />
        </Sidebar.Header>
        <Sidebar.Body>
          <Chat.List data={{${setContext(chats)}}}/>
        </Sidebar.Body>
      </Sidebar>
      <Main >
      <Chat.Messages />
      </Main> 
    </Wrapper>`;
  }
}
