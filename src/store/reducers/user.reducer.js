import { userService } from '../../services/user.service.js'

export const SET_USER = 'SET_USER'
export const SET_SCORE = 'SET_SCORE'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'


const initialState = {
    user: userService.getLoggedInUser()
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }

        case SET_SCORE:
            newState = { ...state, user: { ...state.user, score: action.score } }
            break

        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break

        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break

        case SET_USERS:
            newState = { ...state, users: action.users }
            break

        default:
            return state
    }
}
