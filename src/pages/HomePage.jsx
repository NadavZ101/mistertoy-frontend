import { Link } from "react-router-dom";

export function HomePage() {

    return <div className="home-page">

        <section className="about">
            <h1>Welcome to Toys Land – Where Imagination Plays!</h1>
            <p>Embark on an enchanting journey through a world

                From timeless classics to the latest must-haves, our Toys Collection is meticulously curated to captivate toy lovers of all ages. Whether you're looking for a cuddly companion for your little one or a challenging puzzle that brings the family together, you'll find it here in Toys Land.

                At Toys Land, we believe in the power of play as a path to growth, discovery, and joy. So step in and let your imagination soar – it's time to play, explore, and create memories that will last a lifetime!
            </p>

            <Link to="/toy">Discover Our Toys Collection</Link>
        </section>

    </div>
}