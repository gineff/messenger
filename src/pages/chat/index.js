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
    const data = [1,2,3];

    return `
    <Wrapper className="chat-view">
      <Sidebar>
        <Sidebar.Header>
          <User.ProfileLink />
          <Chat.SearchForm />
          <p>sidebar</p>
        </Sidebar.Header>
        <Sidebar.Body>
          <Chat.List data={{${setContext(data)}}}/>
        </Sidebar.Body>
      </Sidebar>
      <Main >
      <Chat.Messages />
      </Main> 
    </Wrapper>`;
  }
}
