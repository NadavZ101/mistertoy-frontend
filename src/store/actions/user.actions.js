import { userService } from "../../services/user.service.js"
import { SET_USER } from "../reducers/user.reducer"

import { store } from "../store.js"

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