import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy, onEditToy }) {

    return <ul className="toy-list clean-list grid cards">
        {
            toys.map(toy =>
                <li className="toy-preview card flex center column" key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button className="btn" onClick={() => onRemoveToy(toy._id)}>X</button>
                    </div>
                </li>)
        }
    </ul>
}