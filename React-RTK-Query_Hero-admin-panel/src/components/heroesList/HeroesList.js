import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {

    const {
        data: heroes = [],
        isLoading,
        isError
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter);

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (activeFilter === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter)
        }
    }, [heroes, activeFilter]);


    const onDelete = useCallback((id) => {
        deleteHero(id);
    }, [])

    if ( isLoading ) {
        return <Spinner/>;
    } else if ( isError ) {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">There are no heroes yet</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;