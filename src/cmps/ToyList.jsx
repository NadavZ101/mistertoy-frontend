import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy, onEditToy }) {

    return <ul className="toy-list">
        {
            toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button className="btn" onClick={() => onRemoveToy(toy._id)}>X</button>
                        <button className="btn" onClick={() => onEditToy(toy._id)}>Edit</button>
                    </div>
                </li>)
        }
    </ul>
}