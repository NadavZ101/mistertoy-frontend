import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy, onEditToy }) {

    return <div>
        <button className="add-toy-btn"><Link to="/toy/edit">Add Toy</Link>
        </button>

        <ul className="toy-list clean-list grid cards">
            {
                toys.map(toy =>
                    <li className="toy-preview card flex center column" key={toy._id}>
                        <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />

                        <div>
                            {/* <button className="btn" onClick={() => onRemoveToy(toy._id)}>X</button> */}
                        </div>
                    </li>)
            }
        </ul>
    </div>
}