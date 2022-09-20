import Component from "../../utils/component";
import "./index.css";

const useContext = ()=> {

}
export {useContext}

export default class Wrapper extends Component {
  render() {
    const { children, className } = this.state;

    return `
    <div class="wrapper ${className}">
      ${children}
    </div>`;
  }
}
