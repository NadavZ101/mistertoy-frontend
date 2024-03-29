import { storageService } from "./async-storage.service.js"

const USERS_KEY = 'userDB'
const LOGGEDIN_KEY = 'user'

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
    return storageService.query(USERS_KEY)
}

function login({ username, password }) {
    console.log("🚀 ~ login ~ username:", username)
    console.log("🚀 ~ login ~ password:", password)

    return storageService.query(USERS_KEY)
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password)
            if (user) {

                console.log("🚀 ~ login ~ user:", user)
                return _setLoggedInUser(user)
            }
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = {
        username,
        password,
        fullname,
    }
    console.log("🚀 ~ signup ~ user:", user)


    return storageService.post(USERS_KEY, user)
        .then(_setLoggedInUser)
}

function logout() {
    sessionStorage.removeItem(LOGGEDIN_KEY)
    return Promise.resolve()

}

function getLoggedInUser() {
    const user = JSON.parse(sessionStorage.getItem(LOGGEDIN_KEY))
    console.log("Retrieved user from sessionStorage:", user)
    return user
}

function getUserById(userId) {
    return storageService.get(USERS_KEY, userId)
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