import { SHOW_DRAWER } from '../constants/app'

const initialState = {
    drawer: false
}

export default function mini_dialog(state = initialState, action) {
    switch (action.type) {
        case SHOW_DRAWER:
            return {...state, drawer: action.payload}
        default:
            return state
    }
}