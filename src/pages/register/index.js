import Component, {stringifyProps} from "../../utils/component";
import Wrapper from "../../components/wrapper";
import Form from "../../components/form";
import Button from "../../components/button";
import "./index.css";

const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const loginRegExp = /^[a-zA-Z0-9.$_]{4,256}$/;
const textRegExp = /^[a-zA-Zа-яА-Я.$_]{4,256}$/;
const phoneRegExp = /^(\+\d|8)[ ()\d-]{10,16}$/;

function goToElementHref(element) {
  const e = window.event;
  const href = element.getAttributeNode("href").value;
  console.log("href", href);
  
  e.preventDefault();
  if(href != undefined) window.location = href;
}

function onSubmit(element) {
  const form = element.closest(".form");
  const controls = form.querySelectorAll(".form__control");

  for(element of controls) {
    valiateFormInput(element);
  }
}

function onblur(element) {
  valiateFormInput(element);
}

function valiateFormInput(element) {
  const group = element.parentNode;
  const requireIsValid = element.required? !!element.value : true;

  group.classList[requireIsValid? "remove" : "add"]("form__group_invalid-require");
  
  switch(element.type) {
    case "email": {
      const emailIsValid = emailRegExp.test(element.value);

      group.classList[(!requireIsValid || emailIsValid)? "remove" : "add"]('form__group_invalid-email');
      break;
    }
    case "text": {
      if(element.id === "login") {
        const loginIsValid = loginRegExp.test(element.value);

        group.classList[(!requireIsValid || loginIsValid)? "remove" : "add"]('form__group_invalid-login');
      }else {
        const textIsValid = textRegExp.test(element.value);

        group.classList[(!requireIsValid || textIsValid)? "remove" : "add"]('form__group_invalid-text');
      }
      break;
    }
    case "tel": {
      const phoneStrIsValid = phoneRegExp.test(element.value);
      const phoneNumberlength = element.value.match(/\d/g).length;

      group
        .classList[(!requireIsValid || (phoneStrIsValid && phoneNumberlength === 11))? "remove" : "add"]('form__group_invalid-phone');
      break;
    }
    case "password" : {
      if(element.id === "password2") {
        const passIsValid = (element.value === document.getElementById("password").value);
        
        group.classList[(!requireIsValid || passIsValid)? "remove" : "add"]('form__group_invalid-password')
      }
    }
  }
}

export default class Login extends Component {
  state = {Wrapper, Form, Button, goToElementHref, onSubmit, onblur};

  render() {
    const inputs = [
      {id: "email", type: "email", placeholder: "pochta@yandex.ru", label: "Почта"},
      {id: "login", type: "text", placeholder: "ivanivanov", label: "Логин"},
      {id: "name", type: "text", placeholder: "Иван", label: "Имя"},
      {id: "secondname", type: "text", placeholder: "Иванов", label: "Фамилия"},
      {id: "phone", type: " tel", placeholder: "+7 (***) *** ** **", label: "Телефон"},
      {id: "password", type: "password", placeholder: "••••••••••••",  label: "Пароль"},
      {id: "password2", type: "password", placeholder: "••••••••••••", label: "Пароль (еще раз)"}
    ];
    const inputsView = inputs.reduce((prev, {label, ...rest})=> (prev+
      `<Form.Group>
        <Form.Label>${label}</Form.Label>
        <Form.Control ${stringifyProps({...rest, onblur, required: true})} />
      </Form.Group>`
    ),``);
    const ninjaData = [
      {
        variant: "primary",
        href: "/chat",
        className: "login-form__apply-button",
        title: "Зарегистрироваться",
        onclick: "{{onSubmit}}"
      },{
        variant: "link",
        href: "/login",
        className: "login-form__alternative-button",
        title: "Войти",
        onclick: "{{goToElementHref}}"
      }
    ];
    const buttons = ninjaData.reduce((prev, props)=> prev+`<Button ${stringifyProps(props)}/>`,``);

    return `
    <Wrapper  className="login-form" >
      <Form>
        <Form.Header>
          Регистрация
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
