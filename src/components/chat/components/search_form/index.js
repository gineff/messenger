import Component from "../../../../utils/component";
import Control from "../../../form/components/control";
import {  stringifyProps } from "../../../../utils";
import "./index.css";

export default class SearchForm extends Component {
  constructor(props) {
    super({...props, "Form.Control": Control});
  }

  render() {
    const { onSearchSubmit } = this.state;


    return `
    <div class="chat__search-form">
       <Form.Control className="chat__search-form-control" placeholder="Поиск" />
    </div>`;
  }
}
