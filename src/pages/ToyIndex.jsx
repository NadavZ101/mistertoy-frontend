import { useEffect } from "react";
import { useSelector } from "react-redux";


export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('Cannot load toys')
            })
    })

    function onRemoveToy(toyId) {

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