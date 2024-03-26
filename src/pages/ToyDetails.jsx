import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getToyById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Problem in load toy', err)
                Navigate('/toy')
            })
    }

    if (!toy) return <div>Loading toy...</div>
    return (
        <section className="toy-details flex column">
            <h2>Toy Details</h2>
            <h4>Name: {toy.name}</h4>
            <p>Price: ${toy.price}</p>
            <p>Labels: {toy.labels.join(', ')}</p>
            <p>In Stock: {toy.inStock ? 'Yes' : 'No'}</p>
            <p>Created at: {new Date(toy.createdAt).toLocaleDateString()}</p>

            <Link to="/toy"><button className="btn">←</button></Link>
        </section>
    )
}
