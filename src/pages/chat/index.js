import Component from "../../utils/component";
import Wrapper from "../../components/wrapper";
import Sidebar, { Header, Body } from "../../components/sidebar";
import Main from "../../components/main";
import Chat, {
  ProfileLink,
  Search,
  List,
  Messages,
} from "../../components/chat";
import "./index.css";

export default class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Wrapper,
      Sidebar,
      Main,
      "Sidebar.Header": Header,
      "Sidebar.Body": Body,
      Chat,
      "Chat.ProfileLink": ProfileLink,
      "Chat.Search": Search,
      "Chat.List": List,
      "Chat.Messages": Messages,
    };
  }

  render() {
    return `
    <Wrapper className="chat-view">
      <Sidebar>
        <Sidebar.Header>
          <Chat.ProfileLink />
          <Chat.Search />
        </Sidebar.Header>
        <Sidebar.Body>
          <Chat.List />
        </Sidebar.Body>
      </Sidebar>
      <Main >
        <Chat.Messages />
      </Main> 
    </Wrapper>`;
  }
}
