/* eslint-disable no-underscore-dangle */
import Component from "../../../../utils/component";
import Avatar from "../avatar";
import Button from "../../../button";
import template from "./index.tem";
import content from "./content.tem";
import "./index.css";


export default class Header extends Component {
  constructor(props) {
    super({ ...props, Button, "Chat.Avatar": Avatar, template });
  }

  render() {
    const { chat } = this.state;
    const chatIsSelected = Boolean(chat);

    this.state.content = chatIsSelected ? this._compile(content, this.state) : "";

    return super.render();
  }
}
