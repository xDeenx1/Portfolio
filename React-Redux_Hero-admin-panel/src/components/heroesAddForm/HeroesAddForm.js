import { useState } from "react";
import { v4 as uiidv4 } from 'uuid';
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { addHero } from '../heroesList/heroesSlice';
import { selectAll as selectAllFilters } from "../heroesFilters/filtersSlice";

const HeroesAddForm = () => {
    const [newHero, setNewHero] = useState({
        "id": '',
        "name": '',
        "description": '',
        "element": '',
        'thumbnail':''
    });

    const filters = useSelector(selectAllFilters);
    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const {request} = useHttp();
    const dispatch = useDispatch();

    const onSubmit = async(e) => {
        e.preventDefault();

        const addNewHero = {
            "id": uiidv4(),
            "name": newHero.name,
            "description": newHero.description,
            "element": newHero.element,
            "thumbnail": newHero.thumbnail
        }

        await request(`http://localhost:3001/heroes`,'POST', JSON.stringify(addNewHero))
            .then(data => console.log(data, "ADDED"))
            .then(dispatch(addHero(addNewHero)))
            .catch(error => console.log(error));

        setNewHero({
            "id": '',
            "name": '',
            "description": '',
            "element": '',
            'thumbnail':''
        });
        
    
    }

    const renderFilters = (filters, status) => {
        if (status === 'loading') {
            return <option>Loading elements</option>
        } else if (status === 'error') {
            return <option>Loading error</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({name, label}) => {
                if (name === 'all') return;

                return (
                    <option key={name} value={name}>{label}</option>
                )
            })
        }
    }

    const filterList = renderFilters(filters, filtersLoadingStatus);

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Name of the new hero</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="What is my name?"
                    onChange={(e) => setNewHero({...newHero, name: e.target.value})}
                    value={newHero.name}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="What is my power?"
                    style={{"height": '130px'}}
                    onChange={(e) => setNewHero({...newHero, description: e.target.value})}
                    value={newHero.description}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Choose hero element</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={(e) => setNewHero({...newHero, element: e.target.value})}
                    >
                    <option >My power element is...</option>
                    {filterList}
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="thumbnail" className="form-label fs-4">Input link to new hero image</label>
                <input 
                    required
                    type="text" 
                    name="thumbnail" 
                    className="form-control" 
                    id="thumbnail" 
                    placeholder="Link to hero image."
                    onChange={(e) => setNewHero({...newHero, thumbnail: e.target.value})}
                    value={newHero.thumbnail}
                    />
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;