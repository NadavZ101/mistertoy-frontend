import { useEffect } from "react"
import { useSelector } from "react-redux"


import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'

import { loadToys, removeToy, setFilterBy } from "../store/actions/toy.actions"
import { Link } from "react-router-dom"

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('Cannot load toys')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                console.log('Successfully removed toy')
            })
            .catch(err => {
                console.log('Cannot removed toys')
            })
    }

    function onSetFilter(filterBy) {
        console.log("🚀 ~ onSetFilter ~ filterBy:", filterBy)

        setFilterBy(filterBy)
    }

    function onSetSort(sortBy) {

    }


    if (!toys) return <div>Loading Toys...</div>
    return (
        <div>
            <h3>Meet Mister Toy</h3>
            <button className="btn"><Link to="/toy/edit">Add Toy</Link>
            </button>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} onSetSort={onSetSort} />
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
            />
        </div>
    )

}