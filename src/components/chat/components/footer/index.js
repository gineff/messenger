/* eslint-disable no-underscore-dangle */
import Component from "../../../../utils/component";
import { useEventBus } from "../../../../utils";
import Button from "../../../button";
import { Control } from "../../../form";
import SearchForm from "../search_form";
import template from "./index.tem";
import "./index.css";

const [, emit] = useEventBus;

const addClickHandler = (e) => {
  console.log(e);
  emit("newMessageAdded");
};
const addNewMessage = () => {};

export default class Footer extends Component {
  constructor(props) {
    super({ ...props, Button, Control, SearchForm, template, addClickHandler });
  }

  render() {
    return super.render();
  }
}
