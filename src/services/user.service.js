import { storageService } from "./async-storage.service.js"
import { httpService } from "./http.service.js"

const LOGGEDIN_KEY = 'user'

const BASE_URL = 'auth/'

export const userService = {
    login,
    signup,
    logout,
    getLoggedInUser,
    getUserById,
    getEmptyCredentials,
}

function login({ username, password }) {
    return httpService.post(BASE_URL + 'login', { username, password })
        .then(user => {
            if (user) return _setLoggedInUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = {
        username,
        password,
        fullname,
    }

    return httpService.post(BASE_URL + 'signup', user)
        .then(user => {
            if (user) return _setLoggedInUser(user)
            else return Promise.reject('Invalid signup')
        })
}

function logout() {
    return httpService.post(BASE_URL + 'logout')
        .then(() => {
            sessionStorage.removeItem(LOGGEDIN_KEY)
        })

}

function getUserById(userId) {
    return httpService.get('user/' + userId)
}

function getLoggedInUser() {
    const user = JSON.parse(sessionStorage.getItem(LOGGEDIN_KEY))
    console.log("Retrieved user from sessionStorage:", user)
    return user
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
    }
}

function _setLoggedInUser(user) {
    const userToStore = { ...user }
    delete userToStore.password
    console.log('userService ->_setLoggedInUser ', userToStore)
    //saving the loggedIn user in local storage (without sensetive details)
    sessionStorage.setItem(LOGGEDIN_KEY, JSON.stringify(userToStore))
    return userToStore
}