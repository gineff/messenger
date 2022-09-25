import Component from "../../../../utils/component";
import Button from "../../../button";
import template from "./index.tem";
import "./index.css";

export default class ProfileLink extends Component {
  constructor(props) {
    super({ ...props, template, Button });

    this.state.buttonProps = {
      variant: "link",
      href: "/profile",
      className: "user_profile-link-button",
    };
  }
}
