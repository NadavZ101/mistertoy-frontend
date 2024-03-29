import { oldToyService } from "../../services/toy.service-old.js"


import { toyService } from "../../services/toy.service.js"
import { SET_TOYS, REMOVE_TOY, UPDATE_TOY, ADD_TOY, SET_FILTER_BY, SET_SORT_BY } from "../reducers/toy.reducer.js"
import { store } from '../store.js'

export function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    const sortBy = store.getState().toyModule.sortBy


    return oldToyService.query(filterBy, sortBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy actions -> Cannot load toys', err)
            throw err
        })
}

// export function loadToys() {
//     const filterBy = store.getState().toyModule.filterBy
//     const sortBy = store.getState().toyModule.sortBy

//     return toyService.query(filterBy, sortBy)
//         .then(toys => {
//             store.dispatch({ type: SET_TOYS, toys })
//         })
//         .catch(err => {
//             console.log('toy actions -> Cannot load toys', err)
//             throw err
//         })
// }

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy actions -> Cannot remove toy', err)
            throw err
        })
}

export function saveToy(toy) {
    console.log("🚀 ~ saveToy ~ toy:", toy)

    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            console.log("🚀 ~ saveToy ~ savedToy:", savedToy)

            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('toy actions -> Cannot save toy', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setSortBy(sortBy) {
    console.log("🚀 ~ setSortBy ~ sortBy:", sortBy)

    store.dispatch({ type: SET_SORT_BY, sortBy })
}


store.subscribe(() => {
    console.log('----- Store State changed: ----')
    console.log(store.getState())
    console.log('-------------------------------')
})