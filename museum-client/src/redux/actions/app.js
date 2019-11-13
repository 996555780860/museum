import { SET_APP_STATUS } from '../constants/app'
import axios from 'axios';
import FormData from 'form-data';
import { mainWindow } from '../../App'

export function setData(payload) {
    return {
        type: SET_APP_STATUS,
        payload: {name: payload.name, data: payload.data}
    }
}

export function getData(payload) {
    return async (dispatch) => {
        try {
            const data = new FormData();
            data.append('name', payload.name);
            const res = await axios.post(
                '/data/getclient',
                data);
            payload = {
                data: res.data.data,
                name: payload.name,
            }
            dispatch({
                type: SET_APP_STATUS,
                payload: payload
            })
        } catch(error) {
            console.error(error)
        }
    };
}

export let getOther = async (payload) => {
        try {
            const data = new FormData();
            data.append('name', payload.name);
            if(payload.data != undefined)
                data.append('data', JSON.stringify(payload.data));
            const res = await axios.post(
                '/data/getclient',
                data);
            return res.data
        } catch(error) {
            console.error(error)
        }
}
