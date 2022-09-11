"use strict"
import Component from "../../utils/component";

export default class Wrapper extends Component {

  constructor(props) {
    super(props);
    const {className, children} = props;
    this.state = {className, children};
  }

  render() {
    return `<div class="{{className}}">
    {{children}}
  </div>`;
  }
} 