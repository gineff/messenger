import Component from "../../utils/component";
import Wrapper from "../../components/wrapper";

export default class Er404 extends Component {
  constructor(props) {
    super({ ...props, Wrapper, data: [1, 2, 3, 4] });
  }

  render() {
    const onClick = (element) => {
      console.log("click", element);
    };
    this.state.onClick = onClick;
    return `
      <Wrapper className = "error404" data={{data}} onClick={{onClick}}>
        <p>not found</p>
      </Wrapper>
    `;
  }
}
