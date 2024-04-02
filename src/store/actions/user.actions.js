import { userService } from "../../services/user.service.js"
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer.js'
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER } from '../reducers/user.reducer.js'


import { store } from "../store.js"


export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export function login(credentials) {
    console.log("🚀 ~ login ~ credentials:", credentials)

    return userService.login(credentials)
        .then((user) => {
            store.dispatch({ type: SET_USER, user })
            // return user
        })
        .catch(err => {
            console.log('user actions -> cannot login', err)
            throw err
        })
}

export function signup(credentials) {
    console.log("🚀 ~ signup ~ credentials:", credentials)

    return userService.signup(credentials)
        .then((user) => {
            store.dispatch({ type: SET_USER, user })
            // return user
        })
        .catch(err => {
            console.log('user actions -> cannot signup', err)
            throw err
        })
}


export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}