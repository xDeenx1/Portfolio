import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilters, activeFilterChanged, selectAll as selectAllFilters } from '../heroesFilters/filtersSlice';
import classNames from 'classnames';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
    const filters = useSelector(selectAllFilters);
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters())
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <button>Loading elements</button>
        } else if (status === 'error') {
            return <button>Loading error</button>
        }

        if (filters && filters.length > 0) {
            return filters.map(({name, label, className}) => {

                const btnClass = classNames('btn', className, {
                    'active' : name === activeFilter
                })

                return (
                    <button 
                        key={name} 
                        className={btnClass} 
                        value={name}
                        onClick={() => dispatch(activeFilterChanged(name))}
                        >{label}
                    </button>
                )
            })
        }
    }

    const filtersList = renderFilters(filters, filtersLoadingStatus);


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by elements</p>
                <div className="btn-group">
                    {filtersList}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;