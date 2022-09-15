import Component from "../../../../utils/component";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {children: props?.children};
  }

  render() {
    return `
    <div class="form__footer">
      {{children}}
    </div>`;
  }
} 
