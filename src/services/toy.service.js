import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

const TOYS_KEY = 'toyDB'

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
    return storageService.query(TOYS_KEY)
        .then(toys => {
            if (filterBy.name) {
                const regex = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }

            if (filterBy.inStock !== undefined) {
                console.log("🚀 ~ query ~ filterBy.inStock:", filterBy.inStock)

                const inStock = filterBy.inStock === true
                toys = toys.filter(toy => toy.inStock === inStock)
            }

            if (filterBy.label) {
                toys = toys.filter(toy => toy.labels.includes(filterBy.label))
            }
            return toys
        })
}

function remove(toyId) {
    return storageService.remove(TOYS_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        toy.name = toy.name
        toy.price = toy.price
        toy.inStock = toy.inStock

        return storageService.put(TOYS_KEY, toy)
    }
    else {
        toy.name = toy.name
        toy.price = toy.price
        toy.inStock = toy.inStock
        toy.labels = toy.labels
        toy.createdAt = new Date().getTime()
        toy.inStock = true

        return storageService.post(TOYS_KEY, toy)
    }
}

function getEmptyToy() {
    return { name: '', price: '', labels: [], createdAt: '', inStock: '' }
}

function getToyById(toyId) {
    return storageService.get(TOYS_KEY, toyId)
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


