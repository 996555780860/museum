import {
    AUTHENTICATED,
    UNAUTHENTICATED,
    ERROR_AUTHENTICATED
} from '../constants/user'
import { SHOW_MINI_DIALOG } from '../constants/mini_dialog'
import axios from 'axios';

export function signin(payload) {
    return async (dispatch) => {
        try {
            const res = await axios.post('/users/signin?email='+payload.email+'&password='+payload.password);
            localStorage.userMuseumKNMII = res.data
            await dispatch({ type: AUTHENTICATED });
            await dispatch({
                type: SHOW_MINI_DIALOG,
                payload: false
            })
        } catch(error) {
            await dispatch({
                type: ERROR_AUTHENTICATED,
                payload: true
            })
            console.error(error)
        }
    };
}

export function checkAuthenticated() {
    return async (dispatch) => {
        try {
            if (localStorage.userMuseumKNMII) {
                dispatch ({type: AUTHENTICATED});
            } else {
                dispatch ({type: UNAUTHENTICATED});
            }
        } catch (error) {
            dispatch ({type: UNAUTHENTICATED});
        }
    };
}

export function logout() {
    return async (dispatch) => {
        localStorage.removeItem('userMuseumKNMII')
        dispatch({
            type: UNAUTHENTICATED,
        })
    }
}