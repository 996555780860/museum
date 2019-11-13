import { SET_MINI_DIALOG, SHOW_MINI_DIALOG } from '../constants/mini_dialog'
import React from 'react'
import {
    store
} from '../../index'
import AboutMuseum from '../../component/Add/AboutMuseum';
import VirtualMuseum from '../../component/Add/VirtualMuseum';
import TicketMuseum from '../../component/Add/TicketMuseum';
import ExcursionMuseum from '../../component/Add/ExcursionMuseum';
import GenreMuseum from '../../component/Add/GenreMuseum';
import AuthorMuseum from '../../component/Add/AuthorMuseum';
import EventMuseum from '../../component/Add/EventMuseum';
import ArtworkMuseum from '../../component/Add/ArtworkMuseum';
import Museum from '../../component/Add/Museum';
import ItemMuseum from '../../component/Add/ItemMuseum';

export function setMiniDialog(title,child) {
    return {
        type: SET_MINI_DIALOG,
        payload: {title: title, child: child}
    }
}

export function showAddMiniDialog() {
    return async (dispatch) => {
        if(store.getState().table.name!=''){
            let child;
            if(store.getState().table.name=='О музее')
                child = <AboutMuseum/>
            else if(store.getState().table.name=='Виртуальный музей')
                child = <VirtualMuseum/>
            else if(store.getState().table.name=='Билеты')
                child = <TicketMuseum/>
            else if(store.getState().table.name=='Экскурсия')
                child = <ExcursionMuseum/>
            else if(store.getState().table.name=='Тип произведения')
                child = <GenreMuseum/>
            else if(store.getState().table.name=='Автор произведения')
                child = <AuthorMuseum/>
            else if(store.getState().table.name=='Событие')
                child = <EventMuseum/>
            else if(store.getState().table.name=='Произведение')
                child = <ArtworkMuseum/>
            else if(store.getState().table.name=='Музей')
                child = <Museum/>
            else if(store.getState().table.name=='Товары')
                child = <ItemMuseum/>
            dispatch ({
                type: SET_MINI_DIALOG,
                payload: {title: store.getState().table.name, child: child}
            })
            dispatch ({
                type: SHOW_MINI_DIALOG,
                payload: true
            })
        }
    }
}

export function showMiniDialog(show) {
    return {
        type: SHOW_MINI_DIALOG,
        payload: show
    }
}
