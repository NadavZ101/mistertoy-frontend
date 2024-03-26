import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service";

import { saveToy } from "../store/actions/toy.actions";

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [selectedLabels, setSelectedLabels] = useState([])
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getToyById(toyId)
            .then(toy => {
                setToyToEdit(toy)
                setSelectedLabels(toy.labels || [])
            })
            .catch(err => {
                console.log('Problem in edit toy', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value === 'number' ? +target.value : target.value
        if (target.type === 'checkbox') {
            value = target.checked
        } else if (target.multiple) {
            value = Array.from(target.selectedOptions, option => option.value)
            setSelectedLabels(value)
            return
        }
        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 250
        saveToy(toyToEdit)
    }

    const labels = toyService.getLabels()

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={toyToEdit.name}
                    onChange={handleChange}
                    placeholder="Enter name..."
                />

                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                    placeholder="Enter price..."
                />

                <label htmlFor="inStock">In stock:</label>
                <input
                    type="checkbox"
                    name="inStock"
                    id="inStock"
                    value={toyToEdit.inStock}
                    onChange={handleChange}
                    placeholder="Is in Stock?"
                />

                <label htmlFor="labels">Labels:</label>
                <select
                    multiple
                    name="labels"
                    id="labels"
                    value={selectedLabels}
                    onChange={handleChange}
                >
                    {labels.map((label, idx) => {
                        <option key={idx} value={label}>
                            {label}
                        </option>
                    })}
                </select>
                <button className="btn">{toyToEdit._id ? 'Edit' : 'Add'}</button>
            </form>

        </section>
    )
}