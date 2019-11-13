import React, { useState, useEffect } from 'react';
import './gallery.css';
import './gallery2.css';
import {getOther} from '../../redux/actions/app'
import Masonry from 'react-masonry-component';
import GalleryItem from '../../component/galleryitem/GalleryItem'
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux'
import renderHTML from 'react-render-html';

const Main = React.memo(
    (props) =>{
        let handleScroll =  async () => {
            if(window.pageYOffset+window.outerHeight>document.documentElement.offsetHeight-506)
                getBy(search, sort, false)
        }
        const masonryOptions = {
            transitionDuration: 0
        };
        const { lang } = props.app;
        let [showYearCreate, setShowYearCreate] = useState(false);
        let [searchYearCreate, setSearchYearCreate] = useState('');
        let handleChangeSearchYearCreate = (async (event) => {
            let _searchYearCreate = event.target.value;
            await setSearchYearCreate(_searchYearCreate);
            //await getBy(_searchYearCreate, 'date', true);
        }).bind(this)

        let [showStyleOrMaterial, setShowStyleOrMaterial] = useState(false);
        let [styleOrMaterial, setStyleOrMaterial] = useState([]);
        let [searchStyleOrMaterial, setSearchStyleOrMaterial] = useState('');
        let handleChangeSearchStyleOrMaterial = (event) => {
            setSearchStyleOrMaterial(event.target.value);
        };
        let [showAuthor, setShowAuthor] = useState(false);
        let [author, setAuthor] = useState([]);
        let [searchAuthor, setSearchAuthor] = useState('');
        let handleChangeSearchAuthor = (event) => {
            setSearchAuthor(event.target.value);
        };

        let [search, setSearch] = useState('');
        let [sort, setSort] = useState('');
        let [genre, setGenre] = useState([]);
        let [gallery, setGallery] = useState([]);
        let getBy = async (search, sort, news) => {
            let data;
            let _gallery = [];
            if (!news){
                _gallery = gallery;
            } else {
                await setSearch(search)
                await setSort(sort)
            }
            data = await getOther({name: 'Галлерея', data: {search: search, sort: sort, skip: _gallery.length, genre: props.match.params.genre}});
            console.log(data)
            if(news||data.length>0&&_gallery.filter(element => element._id == data[0]._id).length===0) {
                await Array.prototype.push.apply(_gallery, data);
                await setGallery(_gallery);
            }
        };
        let dates = ['Современное искусство', 'Кыргызское искусство 1930-2019гг.', 'Русское искусство XVIII–XX вв.', 'Советское русское искусство 1920-1980гг.', 'Искусство народов СССР 1950-2015 гг.', 'Зарубежное искусство XVI-XXI вв.', 'Другое']
        useEffect(()=>{
            window.addEventListener('scroll', handleScroll);
            return ()=>{
                window.removeEventListener('scroll', handleScroll);
            }
        });
        useEffect(()=>{(async ()=>{
            let data = await getOther({name: 'Жанры', data: {search: props.match.params.genre}})
            await setGenre(data)
            data = await getOther({name: 'Авторы', data: {search: props.match.params.genre}})
            await setAuthor(data)
            data = await getOther({name: 'СтилиИлиМатериал', data: {search: props.match.params.genre}})
            await setStyleOrMaterial(data)
            await getBy('', '', true)
        })()},[props.match.params.genre])
        if(genre.name_ru!=undefined){
            return (
                <>
                <div className='firstseegallery-museum'>
                    <Fade top>
                    <div className='textlinebig fade-in-top'>
                        {lang===undefined||lang==='ru'? genre.name_ru : lang==='kg'? genre.name_kg : genre.name_eng}
                    </div></Fade><br/>
                    <div>
                        <Fade left>
                        <img className='firstseegallery-image-museum' src={genre.photo_thumbnail} onLoad={(e)=>{if(e.target.src.includes('thumbnail')){e.target.src=genre.photo}}}/>
                        </Fade>
                        <Fade right>
                        <div className='firstseegallery-text-museum'>
                            {renderHTML(genre.description_ru!=undefined?lang==undefined||lang=='ru'? genre.description_ru : lang=='kg'? genre.description_kg : genre.description_eng:'')}
                        </div>
                        </Fade>
                    </div>
                </div>
                <div className='secondseegallery-museum'>
                    <div>
                        <div style={{display: 'inline-block'}}>
                            <Fade left>
                            <button className='secondseegallery-museum-select' onClick={()=>{setShowAuthor(!showAuthor)}}>
                                {lang===undefined||lang==='ru'? 'АВТОР' : lang==='kg'? 'АВТОР' : 'AUTHOR'}
                            </button>
                            </Fade>
                            {showAuthor?
                                <>
                                <div className='gallery-subbackground' onClick={()=>{setSearchAuthor('');setShowAuthor(false);}}/>
                                <div className='gallery-submenu'>
                                    <input className='gallery-submenu-input' type='text' value={searchAuthor} onChange={handleChangeSearchAuthor}/>
                                    <div className='gallery-submenu-item dont-select-text'onClick={()=>{setSearchAuthor(''); getBy('', '', true); setShowAuthor(false)}}>{lang===undefined||lang==='ru'? 'Все' : lang==='kg'? 'Все' : 'All'}</div>
                                    {author!=undefined&&author.length>0 ? (author).map((element) => {
                                        if((element.name!==undefined?(lang===undefined||lang==='ru'? element.name : lang==='kg'? element.name : element.name):'').toLowerCase().includes(searchAuthor.toLowerCase()))
                                            return <div className='gallery-submenu-item dont-select-text'onClick={()=>{
                                                getBy(element._id, 'author', true);
                                                setSearchAuthor('');
                                                setShowAuthor(false)
                                                        }}
                                            >{element.name}</div>
                                        })
                                        :
                                        null
                                    }
                                </div>
                                </>
                                :
                                null
                            }
                        </div>
                        <div style={{display: 'inline-block'}}>
                            <Fade bottom>
                            <button className='secondseegallery-museum-select' onClick={()=>{setShowYearCreate(!showYearCreate)}}>
                                {lang===undefined||lang==='ru'? 'ПЕРИОД' : lang==='kg'? 'ПЕРИОД' : 'PERIOD'}
                            </button>
                            </Fade>
                            {showYearCreate?
                                <>
                                <div className='gallery-subbackground' onClick={()=>{setSearchYearCreate('');setShowYearCreate(false);}}/>
                                <div className='gallery-submenu'>
                                    <input className='gallery-submenu-input' type='text' value={searchYearCreate} onChange={handleChangeSearchYearCreate}/>
                                    <div className='gallery-submenu-item dont-select-text'onClick={()=>{setSearchYearCreate(''); getBy('', '', true); setShowYearCreate(false)}}>{lang===undefined||lang==='ru'? 'Все' : lang==='kg'? 'Все' : 'All'}</div>
                                    {dates.map((element) => {
                                            if((element!==undefined?element:'').toLowerCase().includes(searchYearCreate.toLowerCase()))
                                                return <div className='gallery-submenu-item dont-select-text'onClick={()=>{
                                                    getBy(element, 'date', true);
                                                    setSearchYearCreate('');
                                                    setShowYearCreate(false)
                                                }}
                                                >{element}</div>
                                        })
                                    }
                                </div>
                                </>
                                :
                                null
                            }
                        </div>
                        <div style={{display: 'inline-block'}}>
                            <Fade right>
                            <button className='secondseegallery-museum-select' onClick={()=>{setShowStyleOrMaterial(!showStyleOrMaterial)}}>
                                {lang===undefined||lang==='ru'? 'ЖАНР' : lang==='kg'? 'ЖАНР' : 'ЖАНР'}
                            </button>
                            </Fade>
                            {showStyleOrMaterial?
                                <>
                                <div className='gallery-subbackground' onClick={()=>{setSearchStyleOrMaterial('');setShowStyleOrMaterial(false);}}/>
                                <div className='gallery-submenu'>
                                    <input className='gallery-submenu-input' type='text' value={searchStyleOrMaterial} onChange={handleChangeSearchStyleOrMaterial}/>
                                    <div className='gallery-submenu-item dont-select-text'onClick={()=>{setSearchStyleOrMaterial(''); getBy('', '', true); setShowStyleOrMaterial(false)}}>{lang===undefined||lang==='ru'? 'Все' : lang==='kg'? 'Все' : 'All'}</div>
                                    {(lang===undefined||lang==='ru'? styleOrMaterial.ru : lang==='kg'? styleOrMaterial.kg : styleOrMaterial.eng)!=undefined? (lang===undefined||lang==='ru'? styleOrMaterial.ru : lang==='kg'? styleOrMaterial.kg : styleOrMaterial.eng).map((element) => {
                                        if((element!==undefined?element:'').toLowerCase().includes(searchStyleOrMaterial.toLowerCase()))
                                                return <div className='gallery-submenu-item dont-select-text'onClick={()=>{
                                                    getBy(element, 'styleOrMaterial', true);
                                                    setSearchStyleOrMaterial('');
                                                    setShowStyleOrMaterial(false)
                                                }}
                                                >{element}</div>
                                        })
                                        :
                                        null
                                    }
                                </div>
                                </>
                                :
                                null
                            }
                        </div>
                    </div><br/>
                    <div className='secondseegallery-museum-masonry'>
                        <Masonry options={masonryOptions}>
                            {gallery!=undefined&&gallery.length>0 ? (gallery).map((element, idx) => {
                                return (<GalleryItem element={element} idx={idx} />)
                                })
                                :
                                null
                            }
                        </Masonry>
                    </div>
                </div>
                </>
            );
        } else return null
    })

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(Main);
