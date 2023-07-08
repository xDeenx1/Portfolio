import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';


import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 500, increase: false, rise: false, id: 1},
                {name: 'Alex S.', salary: 800, increase: true, rise: false, id: 2},
                {name: 'Nate B.', salary: 1000, increase: false, rise: false, id: 3},
                {name: 'Sam K.', salary: 1200, increase: false, rise: false, id: 4}
            ],
            term: '',
            filter: 'All'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {data: data.filter(item => item.id !== id)}
        })
        this.maxId--
        
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {data: newArr}
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmployee = (items, term) => {
        if (term.length <= 0) return items;

        return items.filter(item => item.name.indexOf(term) > -1);
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterList = (data, filter) => {
        switch (filter) {
            case 'Promotion' :
                return data.filter(item => item.rise);
            case 'Increase' :
                return data.filter(item => item.increase);
            case 'MoreThen1000':
                return data.filter(item => item.salary > 1000);
            default :
                return data;
        }
    }

    onFilterChange = (filter) => {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;
        const employeesTotal = data.length;
        const employeesToRise = data.filter(item => item.increase).length;
        const visibleData = this.filterList(this.searchEmployee(data, term), filter);
        
        return (
            <div className="app">
                <AppInfo employeesTotal={employeesTotal}
                         employeesToRise={employeesToRise}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterChange={this.onFilterChange}/>
                </div>
    
                <EmployeesList onDelete={this.deleteItem} 
                               data={visibleData} 
                               onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }

    
}

export default App;