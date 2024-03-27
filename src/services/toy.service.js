import { storageService } from "./async-storage.service.js"
import { httpService } from "./http.service.js"
import { utilService } from "./util.service.js"

const TOYS_KEY = 'toyDB'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    remove,
    save,
    getEmptyToy,
    getToyById,
    getLabels,
    getDefaultFilter,
}


_createToys()
//* Data Model

const labels = [
    'On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered', 'Thinking', 'Sport'
]
const toy = {
    _id: 't101',
    name: 'Talking Doll',
    price: 123,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: 1631031801011,
    inStock: true,
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)

}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {

        return httpService.put(BASE_URL, toy)
    }
    else {
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return { name: '', price: '', labels: [], createdAt: '', inStock: '' }
}

function getToyById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function getLabels() {
    return labels
}

function getDefaultFilter() {
    return { name: '', inStock: '', label: '' }
}


//* Demo Data
function _createToys() {
    let toys = utilService.loadFromStorage(TOYS_KEY)
    if (!toys || !toys.length) {
        toys = []
        toys.push(_createToy('Painting pages', 150, ['Art', 'Baby']))
        toys.push(_createToy('Truck', 80, ['Car', 'Battery Powered', 'On Wheels']))
        toys.push(_createToy('Talking Doll', 125, ['Doll', 'Battery Powered', 'Baby']))
        toys.push(_createToy('Puzzle', 125, ['Puzzle', 'Thinking']))
        toys.push(_createToy('Lego', 270, ['Box game', 'Thinking']))
        toys.push(_createToy('Ball', 45, ['Outdoor', 'Sport']))

    }
    utilService.saveToStorage(TOYS_KEY, toys)
}

function _createToy(toyName, toyPrice, toyLabels) {
    const toy = {
        _id: utilService.makeId(),
        name: toyName || '',
        price: toyPrice || '',
        labels: toyLabels || ['Doll', 'Battery Powered', 'Baby'],
        createdAt: new Date().getTime(),
        inStock: true,
    }
    return toy
}


