import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { toyService } from "../services/toy.service"


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 500))

    const labels = toyService.getLabels()

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let field = target.name
        let value = target.value === 'number' ? +target.value : target.value
        if (target.type === 'checkbox') {
            value = target.checked
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="toy-filter full main-layout">
            <h4>Filter Our Toys</h4>
            <form>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={filterByToEdit.name}
                    onChange={handleChange}
                />
                <label htmlFor="inStock">In stock:</label>
                <input
                    type="checkbox"
                    name="inStock"
                    id="inStock"
                    checked={filterByToEdit.inStock}
                    onChange={handleChange}
                />
                <label htmlFor="label">Label:</label>
                <select
                    name="label"
                    id="label"
                    value={filterByToEdit.label}
                    onChange={handleChange}
                >
                    <option value="">All Labels</option>
                    {labels.map((label, idx) => (
                        <option key={idx} value={label}>{label}</option>
                    ))}
                </select>
            </form>
        </section>
    )
}

