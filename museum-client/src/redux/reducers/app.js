import { SET_APP_STATUS } from '../constants/app'

const initialState = {
    museum: {},
    selectedEvent: {},
    selectedArtwork: {},
    lang: 'ru',
}

export default function app(state = initialState, action) {
    let status;
    switch (action.type) {
        case SET_APP_STATUS:
            if (action.payload.name=='Музей'){
                status = {...state, museum: action.payload.data[0]}
            } else if (action.payload.name=='Событие'){
                status = {...state, selectedEvent: action.payload.data}
            } else if (action.payload.name=='Произведение'){
                status = {...state, selectedArtwork: action.payload.data}
            } else if (action.payload.name=='Язык'){
                console.log(action.payload.data)
                status = {...state, lang: action.payload.data}
            }
            return status
        default:
            return state
    }
}