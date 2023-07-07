import { useState } from "react";
import { v4 as uiidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { selectAll as selectAllFilters } from "../heroesFilters/filtersSlice";
import { useCreateHeroMutation } from "../../api/apiSlice";

const HeroesAddForm = () => {
    const [hero, setHero] = useState({
        "id": '',
        "name": '',
        "description": '',
        "element": '',
        'thumbnail':''
    });

    const [createHero, {isLoading}] = useCreateHeroMutation();

    const filters = useSelector(selectAllFilters);
    const {filtersLoadingStatus} = useSelector(state => state.filters);

    const onSubmit = async(e) => {
        e.preventDefault();

        const newHero = {
            "id": uiidv4(),
            "name": hero.name,
            "description": hero.description,
            "element": hero.element,
            "thumbnail": hero.thumbnail
        }

        createHero(newHero).unwrap();

        setHero({
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
                    onChange={(e) => setHero({...hero, name: e.target.value})}
                    value={hero.name}/>
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
                    onChange={(e) => setHero({...hero, description: e.target.value})}
                    value={hero.description}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Choose hero element</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={(e) => setHero({...hero, element: e.target.value})}
                    >
                    <option >My power element is...</option>
                    {filterList}
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="thumbnail" className="form-label fs-4">Input link to a new hero image</label>
                <input 
                    type="text" 
                    name="thumbnail" 
                    className="form-control" 
                    id="thumbnail" 
                    placeholder="Link to hero image."
                    onChange={(e) => setHero({...hero, thumbnail: e.target.value})}
                    value={hero.thumbnail}
                    />
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;