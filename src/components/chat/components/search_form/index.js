import Component from "../../../../utils/component";
import "./index.css";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { children: props?.children };
  }

  render() {
    return `
    <div class="chat__search-form">
      {{children}}
    </div>`;
  }
}