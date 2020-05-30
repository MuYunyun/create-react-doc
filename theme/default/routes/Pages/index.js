import Markdown from '../../lib/markdown';

export default class Pages extends Markdown {
  constructor(props) {
    super(props);
    this.page = props.page;
  }
}
