import Component from "../../../../utils/component";

export default class Footer extends Component {
  render() {
    const { children } = this.state;
    return `
    <div class="form__footer">
      ${children}
    </div>`;
  }
}
