import Component from "../../utils/component";
import { goToElementHref, stringifyProps, useContext } from "../../utils";
import Wrapper from "../../components/wrapper";
import Form from "../../components/form";
import Button from "../../components/button";
import "./index.css";

export default class Login extends Component {
  constructor(props) {
    super({ ...props, Wrapper, Form, Button });
  }

  render() {
    const [, setContext] = useContext;

    console.log("Login");
    const data = [1, 2, 3];
    const inputs = [
      {
        id: "login",
        type: "text",
        placeholder: "ivanivanov",
        label: "Логин",
      },
      {
        id: "password",
        type: "password",
        placeholder: "••••••••••••",
        label: "Пароль",
      },
    ];

    

    const inputsView = inputs.reduce(
      (prev, { id, type, placeholder, label }) =>
        `${prev}<Form.Group>
        <Form.Label>${label}</Form.Label>
        <Form.Control id="${id}" type="${type}" placeholder="${placeholder}"  />
      </Form.Group>`,
      ""
    );

    const ninjaData = [
      {
        variant: "primary",
        href: "/chat",
        className: "login-form__apply-button",
        title: "Авторизоваться",
        clickHandler: goToElementHref,
      },
      {
        variant: "link",
        href: "/register",
        className: "login-form__alternative-button",
        title: "Нет аккаунта?",
        clickHandler: goToElementHref,
      },
    ];

    const buttons = ninjaData.reduce((prev, props) => `${prev}<Button ${stringifyProps(props)}/>`, "");

    return `
      <Wrapper className = "login-form">
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
      </Wrapper>
    `;
  }
}
