import Component from "../../utils/component";
// import UserContext from "../../utils/user";
import template from "./index.tem";
import "./index.css";

export default class Wrapper extends Component {
  constructor(props) {
    // super({ ...props, template, "UserContext.Provider" : UserContext });
    super({ ...props, template });
  }
}
