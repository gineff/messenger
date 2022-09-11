import Templator from "../../utils/templator";
import template from "./register.tmpl"

return Templator.compile(template,{login:"d",password:"dddd"})