/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prefer-stateless-function */
import Component from "./component";

const Provider = class Provider extends Component {
  render() {
    const newElement = this._render().firstChild;
    this.element.replaceWith(newElement);
    this.element = newElement;
    this.addEventHandler(this.element, this.state);
    return this.element;
  }
};

export default function createContext(defaultValue) {
  Provider.state = defaultValue;
  return Provider;
}
