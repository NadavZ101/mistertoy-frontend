import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export function ToySort({ sortBy, onSetSort }) {

    function handleSort(by) {
        const updatedSort = { ...sortBy, by }
        onSetSort(updatedSort)
    }

    function handleDir() {
        const updatedSort = { ...sortBy, asc: !sortBy.asc }
        onSetSort(updatedSort)
    }

    return <section className="toy-sort flex">
        <h3>Sort our toys:</h3>

        {/* <Stack spacing={2} direction="row">
            <Button className="btn" onClick={() => handleSort('name')} variant="By Name">By Name</Button>
            <Button className="btn" onClick={() => handleSort('name')} variant="By Price">By Price</Button>
            <Button className="btn" onClick={handleDir} variant="Direction">Direction {sortBy.asc ? '🔼' : '🔽'}</Button>
        </Stack> */}
        <button onClick={() => handleSort('name')}>By Name</button>
        <button onClick={() => handleSort('price')}>By Price</button>
        <button onClick={handleDir}>Direction {sortBy.asc ? '🔼' : '🔽'}</button>
    </section>
}