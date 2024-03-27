import { Link } from "react-router-dom";

export function HomePage() {

    return <div>
        <h2>Welcome To Mister Toy!</h2>
        <article>
            <h3>Come check out our toys</h3>
            <button className="btn">
                <Link to="/toy">Toys Collection</Link>
            </button>
        </article>
    </div>
}