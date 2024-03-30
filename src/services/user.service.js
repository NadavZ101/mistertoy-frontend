import { storageService } from "./async-storage.service.js"
import { httpService } from "./http.service.js"

const LOGGEDIN_KEY = 'user'

const BASE_URL = 'auth/'

export const userService = {
    query,
    login,
    signup,
    logout,
    getLoggedInUser,
    getUserById,
    getEmptyCredentials,
}

function query() {
    return httpService.get('user')
}

function login(userCred) {
    return httpService.post(BASE_URL + 'login', userCred)
        .then(user => {
            console.log("🚀 ~ userService -- login ~ user:", user)

            if (user) return _setLoggedInUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = {
        username,
        password,
        fullname,
        isAdmin: false
    }

    return httpService.post(BASE_URL + 'signup', user)
        .then(user => {
            console.log("🚀 ~ userService->signup ~ user:", user)

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
        isAdmin: false,
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