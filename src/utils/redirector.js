import {Component} from 'react';
import {withRouter} from 'react-router-dom';

let history_push = null;

function redirect_to(path) {
    if (history_push) {
        history_push(path);
    } else {
        console.error("Redirector is not mounted");
    }
}

class Redirector extends Component {
    componentDidMount() {
        history_push = this.props.history.push;
    }
    render() {
        return null;
    }
}

export default withRouter(Redirector);
export {redirect_to};