import { Component } from 'react';
import './search-panel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            term: ''
        })
    }

    onInputUpdate = (e) => {
        const term = e.target.value;
        this.setState({term})
        this.props.onUpdateSearch(term);
    }

    render () {

        return (
            <input type="text"
                className="form-control search-input"
                placeholder="Search for an employee"
                onChange={this.onInputUpdate}
                value={this.state.term}/>
        );
    }
};

export default SearchPanel;