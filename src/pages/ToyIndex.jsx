import { useEffect } from "react"
import { useSelector } from "react-redux"

import { ToyList } from '../cmps/ToyList.jsx'

import { loadToys, removeToy } from "../store/actions/toy.actions"

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('Cannot load toys')
            })
    }, [])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                console.log('Successfully removed toy')
            })
            .catch(err => {
                console.log('Cannot removed toys')
            })
    }

    function onEditToy(toy) {

    }

    if (!toys) return <div>Loading Toys...</div>
    return (
        <div>
            <h3>Meet Mister Toy</h3>
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                onEditToy={onEditToy}
            />
        </div>
    )

}