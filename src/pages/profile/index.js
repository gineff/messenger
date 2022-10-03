import Component from "../../utils/component";
import { goToElementHref, stringifyProps } from "../../utils";
import Wrapper from "../../components/wrapper";
import Form, { Header, Footer, Body, Group, Label, Control } from "../../components/form";
import Button from "../../components/button";
import template from "./index.tem";
import "./index.css";

export default class Profile extends Component {
  constructor(props) {
    super({
      ...props,
      template,
      Wrapper,
      Button,
      Form,
      "Form.Header": Header,
      "Form.Body": Body,
      "Form.Footer": Footer,
      "Form.Group": Group,
      "Form.Label": Label,
      "Form.Control": Control,
      goToElementHref,
    });

    const inputs = [
      {
        name: "login",
        type: "text",
        placeholder: "ivanivanov",
        label: "Логин",
      },
      {
        name: "password",
        type: "password",
        placeholder: "••••••••••••",
        label: "Пароль",
      },
    ];

    this.state.inputsView = inputs
      .map(
        ({ label, ...rest }) => `
      <Form.Group>
        <Form.Label>${label}</Form.Label>
        <Form.Control ${stringifyProps(rest)} />
      </Form.Group>
    `
      )
      .join("\n");

    const ninjaData = [
      {
        variant: "link",
        className: "profile__change-data-button",
        title: "Изменить данные",
      },
      {
        variant: "link",
        className: "login-form__change-password-button",
        title: "Изменить пароль",
      },
      {
        variant: "link",
        className: "login-form__logout-button",
        title: "Выйти",
      },
    ];

    this.state.buttons = ninjaData.map((data) => new Button(data));
  }

  render() {
    return super.render();
  }
}
