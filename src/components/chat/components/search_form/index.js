import Component from "../../../../utils/component";
import Button from "../../../button";
import { wrapFunction, stringifyProps } from "../../../../utils";
import "./index.css";

export default class SearchForm extends Component {
  render() {
    const { onSearchSubmit } = this.state;

    const buttonProps = {
      variant: "link",
      href: "/profile",
      className: "user_profile-link-button",
      clickHandler: goToElementHref,
    };

    return `
    <div class="chat__search-form">
       <Button ${stringifyProps(buttonProps)}><span>Профиль  ></span></Button>
    </div>`;
  }
}
