import { SET_MINI_DIALOG, SHOW_MINI_DIALOG} from '../constants/mini_dialog'

const initialState = {
    title:'',
    child:null,
    show: false
}

export default function mini_dialog(state = initialState, action) {
    switch (action.type) {
        case SHOW_MINI_DIALOG:
            return {...state, show: action.payload}
        case SET_MINI_DIALOG:
            return {...state, title: action.payload.title, child: action.payload.child}
        default:
            return state
    }
}