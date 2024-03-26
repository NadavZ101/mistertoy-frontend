import { toyService } from "../../services/toy.service.js"

//* Toys
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'


const initialState = {
    toys: [],
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* Toys
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case REMOVE_TOY:
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== action.toyId)
            }

        default:
            return state
    }
}