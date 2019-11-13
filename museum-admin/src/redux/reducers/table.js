import {
    GET_DATA,
    GET_IDS,
    SET_SELECTED,
    SHOW_LOAD
} from '../constants/table'

const initialState = {
    count: 0,
    page: 0,
    data: [],
    data1: [],
    row: [],
    search: '',
    name: '',
    sort: '',
    selected: -1,
    ids: {},
    load: false
}

export default function user(state = initialState, action) {
    switch (action.type) {

        case GET_IDS:
            return {
                ...state,
                ids: action.payload
            };

        case SET_SELECTED:
            return {
                ...state,
                selected: action.payload
            };

        case GET_DATA:
            return {
                ...state,
                count: action.payload.count,
                page: action.payload.page,
                data: action.payload.data,
                data1: action.payload.data1,
                row: action.payload.row,
                search: action.payload.search,
                name: action.payload.name,
                sort: action.payload.sort
            };

        case SHOW_LOAD:
            return {...state, load: action.payload}

        default:
            return state

    }
}