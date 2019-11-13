import React, { useState, useEffect } from 'react';
import './Other.css';
import { getOther } from '../../redux/actions/app'
import EventItem from '../../component/eventitem/EventItem'
import GalleryItem from '../../component/galleryitem/GalleryItem'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../../App'
import Zoom from 'react-reveal/Zoom';
import { connect } from 'react-redux'

const Other =  React.memo(
    (props) =>{
        const { lang } = props.app;
        let [other, setOther] = useState([]);
        let [link, setLink] = useState('');
        let [title, setTitle] = useState('');
        useEffect(()=>{
            if (props.title == 'ВЫСТАВКИ И СОБЫТИЯ')
                setTitle(lang===undefined||lang==='ru'? 'ВЫСТАВКИ И СОБЫТИЯ' : lang==='kg'? 'КӨРГӨЗМӨСҮ' : 'EXHIBITIONS & EVENTS')
            else if (props.title == 'ДРУГИЕ СОБЫТИЯ')
                setTitle(lang===undefined||lang==='ru'? 'ДРУГИЕ СОБЫТИЯ' : lang==='kg'? 'ДРУГИЕ СОБЫТИЯ' : 'OTHER EVENTS')
            else if(props.title == 'ГАЛЕРЕЯ') {
                setTitle(lang===undefined||lang==='ru'? 'ГАЛЕРЕЯ' : lang==='kg'? 'ГАЛЕРЕЯ' : 'GALLERY')
            } else if(props.title == 'ПРОИЗВЕДЕНИЯ ПО АВТОРУ') {
                setTitle(lang===undefined||lang==='ru'? 'ПРОИЗВЕДЕНИЯ ПО АВТОРУ' : lang==='kg'? 'ПРОИЗВЕДЕНИЯ ПО АВТОРУ' : 'ARTS BY AUTHOR')
            } else if(props.title == 'ПРОИЗВЕДЕНИЯ ПО ЖАНРУ') {
                setTitle(lang===undefined||lang==='ru'? 'ПРОИЗВЕДЕНИЯ ПО ЖАНРУ' : lang==='kg'? 'ПРОИЗВЕДЕНИЯ ПО ЖАНРУ' : 'ARTS BY GENRE')
            } else if(props.title == 'ПРОИЗВЕДЕНИЯ ПО ГОДУ') {
                setTitle(lang===undefined||lang==='ru'? 'ПРОИЗВЕДЕНИЯ ПО ГОДУ' : lang==='kg'? 'ПРОИЗВЕДЕНИЯ ПО ГОДУ' : 'ARTS BY YEAR')
            }
            },[lang, props.title])
        useEffect(()=>{(async ()=>{
            let data;
            if(props.title == 'ВЫСТАВКИ И СОБЫТИЯ' || props.title == 'ДРУГИЕ СОБЫТИЯ') {
                await setLink('events');
                data = {name: 'ДругиеСобытия'};
            } else if(props.title == 'ГАЛЕРЕЯ') {
                await setLink('genre')
                data = {name: 'ДругиеГаллерея', data: {search: '', sort: '', skip: 0}}
            } else if(props.title == 'ПРОИЗВЕДЕНИЯ ПО АВТОРУ') {
                await setLink('genre')
                data = {name: 'ДругиеГаллерея', data: {search: props.meta, sort: 'author'}}
            } else if(props.title == 'ПРОИЗВЕДЕНИЯ ПО ЖАНРУ') {
                await setLink('genre')
                data = {name: 'ДругиеГаллерея', data: {search: props.meta, sort: 'genre'}}
            } else if(props.title == 'ПРОИЗВЕДЕНИЯ ПО ГОДУ') {
                await setLink('genre')
                data = {name: 'ДругиеГаллерея', data: {search: props.meta, sort: 'date'}}
            }
            data = await getOther(data);
            await setOther(data);
        })()},[props.id])
        return (
            <Zoom>
            <div className='other'>
                <div className='textlinebig'>
                    <Link className='link' to={link} onClick={scrollToTop}>
                        {props.title === 'ПРОИЗВЕДЕНИЯ ПО ЖАНРУ'?'ПРОИЗВЕДЕНИЯ ПО РАЗДЕЛУ':title}
                    </Link>
                </div>
                <div className={props.title === 'ВЫСТАВКИ И СОБЫТИЯ'||props.title === 'ДРУГИЕ СОБЫТИЯ'?'other-line other-flex':'other-line'}>
                    {other!=undefined&&other.length>0 ? (other).map((element, idx) => {
                        if(props.title === 'ВЫСТАВКИ И СОБЫТИЯ'||props.title === 'ДРУГИЕ СОБЫТИЯ'){
                            return (<EventItem element={element} idx={idx} />)
                        } else if(props.title === 'ГАЛЕРЕЯ'||props.title === 'ПРОИЗВЕДЕНИЯ ПО АВТОРУ'||props.title === 'ПРОИЗВЕДЕНИЯ ПО ЖАНРУ'||props.title === 'ПРОИЗВЕДЕНИЯ ПО ГОДУ'){
                            return (<GalleryItem element={element} idx={idx} />)
                        }
                    })
                    :
                    null
                    }
                </div>
            </div>
            </Zoom>
         );
    }
)

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(Other);
