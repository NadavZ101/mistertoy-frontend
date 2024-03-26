
import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {

    return <article className="toy-preview">
        <h4>{toy.name}</h4>
        <p>Price: <span>${toy.price}</span></p>

        <Link to={`/toy/edit/${toy._id}`}>Edit✍️</Link>
        <Link to={`/toy/${toy._id}`}>Details</Link>
    </article>
}
