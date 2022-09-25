/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import template from "./index.tem";
import Component from "../../utils/component";
import Wrapper from "../../components/wrapper";

export default class Er404 extends Component {
  constructor(props) {
    super({ ...props, Wrapper, template });
  }
}
