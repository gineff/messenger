"use strict"
import Component from "../../utils/component";
import Button from "../button";

export default class Form extends Component {

  constructor(props) {
    super(props);
    
    //const {className} = props;
    const submitHandler = ()=> {alert("submit")};

    this.state = {Button, submitHandler};
  }


  render() {
    //const data = [1,2];

    //const buttons = data.reduce((prev,cur)=> prev+`<Button text="but ${cur}" />`,'')

    return `
    <div class="auth-form">
      <div class="auth-form__header">Авторизация</div>
      <div class="auth-form__body">
        <div class="auth-form__input-group">
        </div>
      </div>
      <div class="auth-form__footer">
        <Button title="Submit" onclick="{{submitHandler}}" />
      </div>
    </div>`
  }
} 