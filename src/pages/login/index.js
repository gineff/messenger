"use strict"
import Component from "../../utils/component";
import Wrapper from "../../components/wrapper";
import Form from "../../components/form";
import "./login.css";

export default class Login extends Component {
  state = {Wrapper, Form, wrapper_id: "wrapper_id", formClassName:"someClass", text: "отрисовка Логина"}

  render() {
    return `<Wrapper id="{{wrapper_id}}" className="wraper" number = 3 >
    <Form>
      <Form.Head>
        Вход
      </Form.Head>  
      <Form.Body>
        <Form.Group>
          <Form.Label>Логин</Form.Label>
          <Form.Control>Пароль</Form.Control>
        <Form.Grpup>
      <Form.Body>
    </Form>
    </Wrapper>`;
  }
} 