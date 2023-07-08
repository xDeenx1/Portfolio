import './app-info.css';

function AppInfo({employeesTotal, employeesToRise}) {
    return (
        <div className="app-info">
            <h1>Employees List</h1>
            <h2>Total employees: {employeesTotal}</h2>
            <h2>Will receive bonus to salary: {employeesToRise}</h2>
        </div>
    )
}

export default AppInfo;