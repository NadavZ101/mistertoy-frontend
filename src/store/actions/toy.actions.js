import { toyService } from "../../services/toy.service.js"
import { SET_TOYS, REMOVE_TOY } from "../reducers/toy.reducer.js"
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


store.subscribe(() => {
    console.log('----- Store State changed: ----')
    console.log(store.getState())
    console.log('-------------------------------')
})