"use strict"
import Component from "../../utils/component";
//kimport "button.css";

export default class Button extends Component {

  constructor(props) {
    super(props);
    const {title, onclick} = props;
    this.state = {title, onclick};
  }

  render() {
    return `
    <button class="button button_red" onclick={{onclick}}>
      {{title}}
    </button>`
  }
} 