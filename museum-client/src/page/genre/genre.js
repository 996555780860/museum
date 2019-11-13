import React, { useState, useEffect } from 'react';
import './genre.css';
import { getOther } from '../../redux/actions/app'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../../App'
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux'

const Main = React.memo(
    (props) =>{
        let [genre, setGenre] = useState([]);
        const { lang } = props.app;
        useEffect(()=>{(async ()=>{
            let data = await getOther({name: 'Жанры', data: {search: 'all'}})
            await setGenre(data)
        })()},[])
        return (
            <div className='selectgallery-museum'>
                <Fade top>
                <div className='textlinebig'>
                    {lang===undefined||lang==='ru'? 'ГАЛЕРЕЯ' : lang==='kg'? 'ГАЛЕРЕЯ' : 'GALLERY' }
                </div>
                </Fade>
                <div className='selectgallery-museum-line'>
                    {genre!==undefined&&genre.length>0 ?
                            <>{(genre).map((element) => {
                                return (
                                    <Zoom>
                                        <div className='selectgallery-museum-line-item'>
                                            <Link className='link' to={'/gallery/'+element._id} onClick={scrollToTop}>
                                                <img className='selectgallery-museum-line-item-image' src={element.photo_thumbnail} onLoad={(e)=>{if(e.target.src.includes('thumbnail')){e.target.src=element.photo}}}/>
                                            </Link>
                                            <div className='selectgallery-museum-line-item-name'>
                                                <Link className='link' to={'/gallery/'+element._id} onClick={scrollToTop}>
                                                    {lang===undefined||lang==='ru'? element.name_ru : lang==='kg'? element.name_kg : element.name_eng }
                                                </Link>
                                            </div>
                                        </div>
                                    </Zoom>
                                    )
                            })}</>
                        :
                        null
                    }
                </div>
            </div>
        );
    })


function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(Main);
