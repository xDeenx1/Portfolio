import { Component } from 'react';
import './app-filter.css';

class AppFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonData: [
                {name: 'All', label: 'All'},
                {name: 'Promotion', label: 'For promotion'},
                {name: 'Increase', label: 'Salary bonus'},
                {name: 'MoreThen1000', label: 'Salary higher then 1 000'}
            ]
        }
    }

    render() {
        const buttonsList = this.state.buttonData.map(({name, label}) => {
            const  active = this.props.filter === name;
            const clazz = active ? 'btn-light' : 'btn-outline-light';
            return (
                <button type="button"
                        className={`btn ${clazz}`}
                        key={name}
                        onClick={() => this.props.onFilterChange(name)}>
                        {label}
                </button>
            )
        });

        return (
            <div className="btn-group">
                {buttonsList}
            </div>
        );
    }
}

export default AppFilter;