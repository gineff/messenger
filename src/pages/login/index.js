import Component, { stringifyProps } from "../../utils/component";
import goToElementHref from "../../utils/goToElementHref";
import Wrapper from "../../components/wrapper";
import Form from "../../components/form";
import Button from "../../components/button";
import "./index.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { Wrapper, Form, Button, goToElementHref };
  }

  render() {
    const inputs = [
      {
        id: "login",
        type: "text",
        placeholder: "ivanivanov",
        value: "",
        label: "Логин",
      },
      {
        id: "password",
        type: "password",
        placeholder: "••••••••••••",
        value: "",
        label: "Пароль",
      },
    ];

    const inputsView = inputs.reduce(
      (prev, { id, type, placeholder, value, label }) =>
        `${prev}<Form.Group>
        <Form.Label>${label}</Form.Label>
        <Form.Control id="${id}" type="${type}" placeholder="${placeholder}" value="${value}" />
      </Form.Group>`,
      ""
    );

    const ninjaData = [
      {
        variant: "primary",
        href: "/chat",
        className: "login-form__apply-button",
        title: "Авторизоваться",
        onclick: "{{goToElementHref}}",
      },
      {
        variant: "link",
        href: "/register",
        className: "login-form__alternative-button",
        title: "Нет аккаунта?",
        onclick: "{{goToElementHref}}",
      },
    ];

    const buttons = ninjaData.reduce(
      (prev, props) => `${prev}<Button ${stringifyProps(props)}/>`,
      ""
    );

    return `
    <Wrapper  className="login-form" >
      <Form>
        <Form.Header>
          Вход
        </Form.Header>  
        <Form.Body>
          ${inputsView}
        </Form.Body>
        <Form.Footer>
          ${buttons}
        </Form.Footer>
      </Form>
    </Wrapper>`;
  }
}
