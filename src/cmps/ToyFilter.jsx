import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { toyService } from "../services/toy.service"

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })


    onSetFilter = useRef(utilService.debounce(onSetFilter, 500))

    const labels = toyService.getLabels()

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { name, value, type } = target
        if (type === 'checkbox') value = target.checked
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }))
    }


    return (
        <section className="toy-filter full main-layout">
            <h3>Filter Our Toys</h3>
            <form>

                <TextField className="filter-name"
                    id="txt"
                    label="name"
                    name="txt"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label className='filter-stock'>
                    <span className='filter-stock'>In stock:</span>
                    <select
                        onChange={handleChange}
                        name="inStock"
                        value={filterByToEdit.inStock || ''}>
                        <option value=""> All </option>
                        <option value={true}>In stock</option>
                        <option value={false}>Out of stock</option>
                    </select>
                </label>

                <label className="filter-label" htmlFor="label">
                    <span className='filter-label'>Label:</span>
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
                </label>

            </form>
        </section>
    )
}

