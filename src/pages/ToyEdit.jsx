import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service";

import { saveToy } from "../store/actions/toy.actions";

import { MultiSelect } from '../cmps/MultiSelect';

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
        const value = target.type === 'number' ? +target.value : target.value

        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }

    function onSetLabel(label) {
        const labels = toyToEdit.labels.includes(label)
            ? toyToEdit.labels.filter(l => l !== label)
            : [label, ...toyToEdit.labels]
        console.log("🚀 ~ onSetLabel ~ labels:", labels)
        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, labels }))

    }

    function isInStock() {
        return toyToEdit.inStock
    }

    function onSaveToy(ev) {
        ev.preventDefault()

        console.log("Saving toy with labels:", toyToEdit.labels)

        const newToy = {
            ...toyToEdit,
            inStock: (toyToEdit.inStock === 'true') ? true : false
        }

        if (!newToy.price) newToy.price = 250
        saveToy(newToy)
            .then(() => {
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in adding toy', err)
            })
    }

    const labels = toyService.getLabels()

    return (
        <section className="toy-edit-container">
            <div className="toy-edit">
                <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

                <form onSubmit={onSaveToy}>
                    <label className="name-label" htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={toyToEdit.name}
                        onChange={handleChange}
                        placeholder="Enter name..."
                    />

                    <label className="price-label" htmlFor="price">Price:</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={toyToEdit.price}
                        onChange={handleChange}
                        placeholder="Enter price..."
                    />

                    <label className="stock-label" htmlFor="inStock">In stock:</label>
                    <select
                        name="inStock"
                        value={isInStock()}
                        onChange={handleChange}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>

                    {/* <label htmlFor="inStock">In stock:</label>
                    <input
                        type="checkbox"
                        name="inStock"
                        id="inStock"
                        checked={toyToEdit.inStock}
                        onChange={handleChange}
                    /> */}

                    <MultiSelect onSetLabel={onSetLabel} toyToEdit={toyToEdit} />

                    <button className="btn">{toyToEdit._id ? 'Edit' : 'Add'}</button>

                    <Link className="link" to="/toy">Back</Link>
                </form>
            </div>
        </section>
    )
}