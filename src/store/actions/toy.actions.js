import { toyService } from "../../services/toy.service.js"
import { SET_TOYS, REMOVE_TOY, UPDATE_TOY, ADD_TOY } from "../reducers/toy.reducer.js"
import { store } from '../store.js'

export function loadToys() {

    return toyService.query()
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


store.subscribe(() => {
    console.log('----- Store State changed: ----')
    console.log(store.getState())
    console.log('-------------------------------')
})