import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { toyService } from "../services/toy.service"


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [sortBy, setSortBy] = useState('')
    const [isDesc, setIsDesc] = useState(false)

    onSetFilter = useRef(utilService.debounce(onSetFilter, 500))

    const labels = toyService.getLabels()

    useEffect(() => {
        const criteria = { ...filterByToEdit, sortBy, isDesc }
        onSetFilter.current(criteria)
    }, [filterByToEdit, sortBy, isDesc])

    // useEffect(() => {
    //     onSetFilter.current(filterByToEdit)
    // }, [filterByToEdit, sortBy, isDesc])

    function handleChange({ target }) {
        const { name, value, type, checked } = target

        if (type === 'checkbox') {
            if (name === 'inStock') {
                setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: checked }))
            } else if (name === 'desc') {
                setIsDesc(checked)
            }
        } else if (name === 'sort') {
            setSortBy(value)
        } else {
            setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
        }
    }
    // function handleChange({ target }) {
    //     let field = target.name
    //     let value = target.value === 'number' ? +target.value : target.value
    //     if (target.type === 'checkbox') {
    //         value = target.checked
    //     }
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    // }

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

                <label htmlFor="sort">Sort by:</label>
                <select name="sort" id="sort" value={sortBy} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Created</option>
                </select>

                <label htmlFor="desc">Descending:</label>
                <input
                    type="checkbox"
                    name="desc"
                    id="desc"
                    checked={isDesc}
                    onChange={handleChange}
                />
            </form>
        </section>
    )
}

