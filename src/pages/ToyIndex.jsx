import { useEffect } from "react"
import { useSelector } from "react-redux"


import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToySort } from '../cmps/ToySort.jsx'

import { loadToys, removeToy, setFilterBy, setSortBy } from "../store/actions/toy.actions"
import { Link } from "react-router-dom"

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
    console.log("🚀 ~ ToyIndex ~ sortBy:", sortBy)


    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('Cannot load toys')
            })
    }, [filterBy, sortBy])

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
        setFilterBy(filterBy)
    }

    function onSetSort(sortBy) {
        setSortBy(sortBy)
    }


    if (!toys) return <div>Loading Toys...</div>
    return (
        <div className="toy-index">
            <h1>Our Toys</h1>
            <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <ToySort sortBy={sortBy} onSetSort={onSetSort} />

            {/* <button className="add-toy-btn"><Link to="/toy/edit">Add Toy</Link>
            </button> */}

            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
            />
        </div>
    )

}