import { toyService } from "../../services/toy.service.js"
import { SET_TOYS, REMOVE_TOY, UPDATE_TOY, ADD_TOY, SET_FILTER_BY } from "../reducers/toy.reducer.js"
import { store } from '../store.js'

export function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy actions -> Cannot load toys', err)
            throw err
        })
}

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
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
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


store.subscribe(() => {
    console.log('----- Store State changed: ----')
    console.log(store.getState())
    console.log('-------------------------------')
})