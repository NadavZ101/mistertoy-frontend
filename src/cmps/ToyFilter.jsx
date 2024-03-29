import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { toyService } from "../services/toy.service"

import TextField from '@mui/material/TextField';


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })


    onSetFilter = useRef(utilService.debounce(onSetFilter, 500))

    const labels = toyService.getLabels()

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { name, value, type, checked } = target
        if (type === 'checkbox') value = target.checked
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
    }


    return (
        <section className="toy-filter full main-layout">
            <h4>Filter Our Toys</h4>
            <form>

                <TextField
                    id="txt"
                    label="name"
                    name="txt"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label className='filter-label'>
                    <span className='filter-label'>In stock</span>
                    <select
                        onChange={handleChange}
                        name="inStock"
                        value={filterByToEdit.inStock || ''}>
                        <option value=""> All </option>
                        <option value={true}>In stock</option>
                        <option value={false}>Out of stock</option>
                    </select>
                </label>

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

