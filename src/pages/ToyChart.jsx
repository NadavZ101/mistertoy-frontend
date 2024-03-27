
import { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';
import { useSelector } from 'react-redux';

import { loadToys, removeToy, setFilterBy } from "../store/actions/toy.actions"


ChartJS.register(ArcElement, Tooltip, Legend);

export function ToyChart() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('Cannot load toys')
            })
    }, [filterBy])
    console.log("🚀 ~ ToyChart ~ toys:", toys)


    const pricePerLabel = toys.reduce((acc, toy) => {
        toy.labels.forEach(label => {
            if (!acc[label]) {
                acc[label] = []
            }
            acc[label].push(toy.price)
        })
        return acc
    }, {})

    const labels = Object.keys(pricePerLabel)
    const averagePricePerLabel = Object.values(pricePerLabel)



    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of Votes',
                data: averagePricePerLabel,
                // data: [155, 414, 225, 777, 125, 333, 90, 200, 100, 150],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <h2>Toys data Chart</h2>
            <Pie data={data} />
        </>
    )

}
