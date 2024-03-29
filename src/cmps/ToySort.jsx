

export function ToySort({ sortBy, onSetSort }) {

    function handleSort(by) {
        const updatedSort = { ...sortBy, by }
        onSetSort(updatedSort)
    }

    function handleDir() {
        const updatedSort = { ...sortBy, asc: !sortBy.asc }
        onSetSort(updatedSort)
    }

    return <section className="toy-sort">
        <h3>Sort our toys:</h3>
        <button onClick={() => handleSort('name')}>By Name</button>
        <button onClick={() => handleSort('price')}>By Price</button>
        <button onClick={handleDir}>Direction {sortBy.asc ? '🔼' : '🔽'}</button>
    </section>
}