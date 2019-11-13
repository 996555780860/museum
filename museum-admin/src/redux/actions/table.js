import {
    GET_DATA,
    GET_IDS,
    SET_SELECTED,
    SHOW_LOAD
} from '../constants/table'
import axios from 'axios';
import FormData from 'form-data';

export function setData(payload) {
    return async (dispatch) => {
        try {
            dispatch({
                type: SHOW_LOAD,
                payload: true
            })
            const data = new FormData();
            let _headers;
            data.append('id', payload.id);
            data.append('search', payload.search);
            data.append('sort', payload.sort);
            data.append('skip', JSON.stringify(payload.page*10));
            data.append('name', payload.name);
            data.append('new', JSON.stringify(payload.data));
            if(payload.oldFile != undefined){
                data.append('oldFile', payload.oldFile);
            }
            if(payload.oldFileWhatermark != undefined){
                data.append('oldFileWhatermark', payload.oldFileWhatermark);
            }
            if (payload.file != undefined) {
                data.append('fileLength', payload.file.length);
                for(let i=0; i<payload.file.length; i++){
                    data.append('file'+i, payload.file[i]);
                    data.append('fileName'+i, payload.file[i].name);
                }
                _headers = {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer ' + localStorage.userMuseumKNMII
                }
            } else {
                _headers = {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization':'Bearer '+localStorage.userMuseumKNMII,
                }
            }
            const res = await axios.post(
                '/data/add',
                data,
                {headers: _headers});
            let row = [];
            for(let i = 0; i<res.data.row.length; i++){
                row.push({
                    name: res.data.row[i],
                    options: {
                        filter: true,
                        sort: true,
                    }
                })
            }
            let data1 = [];
            for(let i = 0; i<res.data.data.length; i++){
                let data2=[]
                for(let i1 = 0; i1<res.data.data[i].length; i1++){
                    let data3 = res.data.data[i][i1]
                    if(data3.length>200&&!data3.includes('http'))
                        data3 = data3.substring(0, 200)+'...'
                    data2.push(data3)
                }
                data1.push(data2)
            }
            payload = {
                count: res.data.count,
                page: payload.page,
                data: res.data.data,
                data1: data1,
                row: row,
                search: payload.search,
                name: payload.name,
                sort: payload.sort
            }
            dispatch({
                type: GET_DATA,
                payload: payload
            })
            dispatch({
                type: SHOW_LOAD,
                payload: false
            })
        } catch(error) {
            alert('ошибка')
            console.error(error)
        }
    };
}

export function addData(payload) {
    return async (dispatch) => {
        try {
            dispatch({
                type: SHOW_LOAD,
                payload: true
            })
            const data = new FormData();
            let _headers;
            data.append('search', payload.search);
            data.append('sort', payload.sort);
            data.append('skip', JSON.stringify(payload.page*10));
            data.append('name', payload.name);
            data.append('new', JSON.stringify(payload.data));
            if (payload.file != undefined) {
                data.append('fileLength', payload.file.length);
                for(let i=0; i<payload.file.length; i++){
                    data.append('file'+i, payload.file[i]);
                    data.append('fileName'+i, payload.file[i].name);
                }
                _headers = {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': 'Bearer ' + localStorage.userMuseumKNMII
                }
            } else {
                _headers = {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization':'Bearer '+localStorage.userMuseumKNMII,
                }
            }
            const res = await axios.post(
                '/data/add',
                data,
                {headers: _headers});
            let row = [];
            for(let i = 0; i<res.data.row.length; i++){
                row.push({
                    name: res.data.row[i],
                    options: {
                        filter: true,
                        sort: true,
                    }
                })
            }
            let data1 = [];
            for(let i = 0; i<res.data.data.length; i++){
                let data2=[]
                for(let i1 = 0; i1<res.data.data[i].length; i1++){
                    let data3 = res.data.data[i][i1]
                    if(data3.length>200&&!data3.includes('http'))
                        data3 = data3.substring(0, 200)+'...'
                    data2.push(data3)
                }
                data1.push(data2)
            }
            payload = {
                count: res.data.count,
                page: payload.page,
                data: res.data.data,
                data1: data1,
                row: row,
                search: payload.search,
                name: payload.name,
                sort: payload.sort
            }
            dispatch({
                type: GET_DATA,
                payload: payload
            })
            dispatch({
                type: SHOW_LOAD,
                payload: false
            })
        } catch(error) {
            alert('ошибка')
            console.error(error)
        }
    };
}

export function setSelected(payload) {
    return {
        type: SET_SELECTED,
        payload: payload
    }
}

export function getIds(payload) {
    return async (dispatch) => {
        try {
            const data = new FormData();
            data.append('name', payload);
            const res = await axios.post(
                '/data/getIds',
                data,
                {headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization':'Bearer '+localStorage.userMuseumKNMII,
                }});
            dispatch({
                type: GET_IDS,
                payload: res.data
            })
        } catch(error) {
            console.error(error)
        }
    };
}

export function getData(payload) {
    return async (dispatch) => {
        try {
            const data = new FormData();
            data.append('search', payload.search);
            data.append('sort', payload.sort);
            data.append('skip', JSON.stringify(payload.page*10));
            data.append('name', payload.name);
            const res = await axios.post(
                '/data/get',
                data,
                {headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization':'Bearer '+localStorage.userMuseumKNMII,
                }});
            let row = [];
            for(let i = 0; i<res.data.row.length; i++){
                row.push({
                        name: res.data.row[i],
                        options: {
                            filter: true,
                            sort: true,
                        }
                    })
            }
            let data1 = [];
            for(let i = 0; i<res.data.data.length; i++){
                let data2=[]
                for(let i1 = 0; i1<res.data.data[i].length; i1++){
                    let data3 = res.data.data[i][i1]
                    if(data3.length>200&&!data3.includes('http'))
                        data3 = data3.substring(0, 200)+'...'
                    data2.push(data3)
                }
                data1.push(data2)
            }
            payload = {
                count: res.data.count,
                page: payload.page,
                data: res.data.data,
                data1: data1,
                row: row,
                search: payload.search,
                name: payload.name,
                sort: payload.sort
            }
            dispatch({
                type: GET_DATA,
                payload: payload
            })
        } catch(error) {
            alert('ошибка')
            console.error(error)
        }
    };
}

export function deleteData(payload) {
    return async (dispatch) => {
        try {
            dispatch({
                type: SHOW_LOAD,
                payload: true
            })
            const data = new FormData();
            data.append('search', payload.search);
            data.append('sort', payload.sort);
            data.append('skip', JSON.stringify(payload.page*10));
            data.append('name', payload.name);
            data.append('deleted', payload.deleted);
            if(payload.oldFile != undefined && payload.oldFile.length > 0){
                data.append('oldFile', payload.oldFile);
            }
            const res = await axios.post(
                '/data/delete',
                data,
                {headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization':'Bearer '+localStorage.userMuseumKNMII,
                }});
            let row = [];
            for(let i = 0; i<res.data.row.length; i++){
                row.push({
                    name: res.data.row[i],
                    options: {
                        filter: true,
                        sort: true,
                    }
                })
            }
            let data1 = [];
            for(let i = 0; i<res.data.data.length; i++){
                let data2=[]
                for(let i1 = 0; i1<res.data.data[i].length; i1++){
                    let data3 = res.data.data[i][i1]
                    if(data3.length>200&&!data3.includes('http'))
                        data3 = data3.substring(0, 200)+'...'
                    data2.push(data3)
                }
                data1.push(data2)
            }
            payload = {
                count: res.data.count,
                page: payload.page,
                data: res.data.data,
                data1: data1,
                row: row,
                search: payload.search,
                name: payload.name,
                sort: payload.sort
            }
            dispatch({
                type: GET_DATA,
                payload: payload
            })
            dispatch({
                type: SHOW_LOAD,
                payload: false
            })
        } catch(error) {
            alert('ошибка')
            console.error(error)
        }
    };
}