import React, { useState, useEffect } from 'react';
import './Header.css';
import { connect } from 'react-redux'
import * as appActions from '../../redux/actions/app'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { getOther } from '../../redux/actions/app'
import Fade from 'react-reveal/Fade';
import Rotate from 'react-reveal/Rotate';
import Ru from '../../image/russia.svg';
import Kg from '../../image/kyrgyzstan.svg';
import Eng from '../../image/unitedstates.svg';

const Header = React.memo(
    (props) => {
        const { museum, lang } = props.app;
        const { setData } = props.appActions;
        let [mobileMenu, setMobileMenu] = useState(false);
        let [showSubmenu, setShowSubmenu] = useState(false);
        let [genre, setGenre] = useState([]);
        useEffect(()=>{(async ()=>{
            let data = await getOther({name: 'Жанры', data: {search: ''}})
            await setGenre(data)
        })()},[]);
        let switchMobileMenu = () => {
            setMobileMenu(!mobileMenu)
        };
        if(museum!=undefined) {
            return (
                <>
                    <div className='header'>
                        <div style={{width: '100%'}}>
                            <div className='header-items'>
                                    <Link to='/'>
                                        <img className='header-logo' src={museum.photo}/>
                                    </Link>
                                <div className='header-item-divider'/>
                                <div className='header-item dont-select-text'>
                                    <Link className='header-submenu-item' to='/events'>
                                        {lang===undefined||lang==='ru'? 'ВЫСТАВКИ И СОБЫТИЯ' : lang==='kg'? 'КӨРГӨЗМӨСҮ' : 'EXHIBITIONS & EVENTS' }
                                    </Link>
                                </div>
                                <div className='header-item-divider'/>
                                <div className='header-menu'>
                                    <div className='header-item dont-select-text'>
                                        <Link className='header-submenu-item' to='/genre'>
                                            {lang===undefined||lang==='ru'? 'ОНЛАЙН ГАЛЕРЕЯ' : lang==='kg'? 'ОНЛАЙН ГАЛЕРЕЯ' : 'ONLINE GALLERY' }
                                        </Link>
                                    </div>
                                    {genre!=undefined&&genre.length>0 ?
                                        <div className='header-submenu'>
                                            {(genre).map((element) => {
                                                return (
                                                    <Link className='header-submenu-item' to={'/gallery/'+element._id}>
                                                        <div style={{margin: '5px'}}>{lang===undefined||lang==='ru'? element.name_ru : lang==='kg'? element.name_kg : element.name_eng}</div>
                                                    </Link>)
                                            })}
                                        </div>
                                    :
                                    null
                                }
                                </div>
                                <div className='header-item-divider'/>
                                <div className='header-menu'>
                                    <div className='header-item dont-select-text'>
                                        {lang===undefined||lang==='ru'? 'ПОСЕТИТЕЛЯМ' : lang==='kg'? 'КЕЛГЕНДЕР' : 'VISITORS'}
                                    </div>
                                    <div className='header-submenu'>
                                        <Link className='header-submenu-item' to='/excursion'>
                                            <div style={{margin: '5px'}}>{lang===undefined||lang==='ru'? 'Экскурсии' : lang==='kg'? 'Экскурсиялар' : 'Excursion'}</div>
                                        </Link>
                                        <Link className='header-submenu-item' to='/ticket'>
                                            <div style={{margin: '5px'}}>{lang===undefined||lang==='ru'? 'Билеты' : lang==='kg'? 'Билеты' : 'Tickets'}</div>
                                        </Link>
                                        <Link className='header-submenu-item' to='/about'>
                                            <div style={{margin: '5px'}}>{lang===undefined||lang==='ru'? 'О музее' : lang==='kg'? 'Музей' : 'About'}</div>
                                        </Link>
                                        <Link className='header-submenu-item' to='/virtual'>
                                            <div style={{margin: '5px'}}>{lang===undefined||lang==='ru'? 'Виртуальный музей' : lang==='kg'? 'Жасалма музей' : 'Virtual Museum'}</div>
                                        </Link>
                                        <Link className='header-submenu-item' to='/store'>
                                            <div style={{margin: '5px'}}>{lang===undefined||lang==='ru'? 'Магазин' : lang==='kg'? 'Дүкөн' : 'Store'}</div>
                                        </Link>
                                    </div>
                                </div>
                                <div className='header-item-divider'/>
                                <img className={lang==='kg'?'header-share-select':'header-share'} src={Kg} onClick={()=>{setData({name: 'Язык', data: 'kg'});}}/>
                                <div className='header-share-divider'/>
                                <img className={lang===undefined||lang==='ru'?'header-share-select':'header-share'} src={Ru} onClick={()=>{setData({name: 'Язык', data: 'ru'});}}/>
                                <div className='header-share-divider'/>
                                <img className={lang==='eng'?'header-share-select':'header-share'} src={Eng} onClick={()=>{setData({name: 'Язык', data: 'eng'});}}/>
                                <img onClick={()=>{switchMobileMenu(); setShowSubmenu(false)}} src='https://i.imgur.com/mATQQ4p.png' className='header-burger-menu'/>
                            </div>
                            <div className='header-divider-mobile'/>
                        </div>
                    </div>
                <Rotate bottom right when={mobileMenu}>
                        <div className='header-items-mobile'>
                            {mobileMenu?
                                <>
                                <div className='header-burger-menu-item'>
                                    <Link className='link' to='/events' onClick={()=>{setMobileMenu(false)}}>
                                        {lang===undefined||lang==='ru'? 'ВЫСТАВКИ И СОБЫТИЯ' : lang==='kg'? 'КӨРГӨЗМӨСҮ' : 'EXHIBITIONS & EVENTS' }
                                    </Link>
                                </div>
                                <div className='header-divider-mobile1'/>
                                <div className='header-burger-menu-item'>
                                    <Link className='link' to='/genre' onClick={()=>{setMobileMenu(false)}}>
                                        {lang===undefined||lang==='ru'? 'ОНЛАЙН ГАЛЕРЕЯ' : lang==='kg'? 'ОНЛАЙН ГАЛЕРЕЯ' : 'ONLINE GALLERY' }
                                    </Link>
                                </div>
                                <div className='header-divider-mobile1'/>
                                <div className='header-burger-menu-item dont-select-text' onClick={()=>{setShowSubmenu(!showSubmenu)}}>
                                    {lang===undefined||lang==='ru'? 'ПОСЕТИТЕЛЯМ' : lang==='kg'? 'КЕЛГЕНДЕР' : 'VISITORS'}
                                </div>
                                <div className='header-divider-mobile1'/>
                                <Fade collapse when={showSubmenu}>
                                    <div>
                                        <div className='header-burger-menu-item'>
                                            <Link className='link' to='/excursion' onClick={()=>{setMobileMenu(false)}}>
                                                <div style={{margin: '5px'}}>{lang===undefined||lang==='ru'? 'Экскурсии' : lang==='kg'? 'Экскурсиялар' : 'Excursion'}</div>
                                            </Link>
                                        </div>
                                        <div className='header-divider-mobile1'/>
                                        <div className='header-burger-menu-item'>
                                            <Link className='link' to='/ticket' onClick={()=>{setMobileMenu(false)}}>
                                                <div style={{margin: '5px'}}>{lang===undefined||lang==='ru'? 'Билеты' : lang==='kg'? 'Билеты' : 'Tickets'}</div>
                                            </Link>
                                        </div>
                                        <div className='header-divider-mobile1'/>
                                        <div className='header-burger-menu-item'>
                                            <Link className='link' to='/about' onClick={()=>{setMobileMenu(false)}}>
                                                <div style={{margin: '5px'}}>{lang===undefined||lang==='ru'? 'О музее' : lang==='kg'? 'Музей' : 'About'}</div>
                                            </Link>
                                        </div>
                                        <div className='header-divider-mobile1'/>
                                        <div className='header-burger-menu-item'>
                                            <Link className='link' to='/virtual' onClick={()=>{setMobileMenu(false)}}>
                                                <div style={{margin: '5px'}}>{lang===undefined||lang==='ru'? 'Виртуальный музей' : lang==='kg'? 'Жасалма музей' : 'Virtual Museum'}</div>
                                            </Link>
                                        </div>
                                        <div className='header-divider-mobile1'/>
                                        <div className='header-burger-menu-item'>
                                            <Link className='link' to='/store' onClick={()=>{setMobileMenu(false)}}>
                                                <div style={{margin: '5px'}}>{lang===undefined||lang==='ru'? 'Магазин' : lang==='kg'? 'Дүкөн' : 'Store'}</div>
                                            </Link>
                                        </div>
                                        <div className='header-divider-mobile1'/>
                                    </div>
                                </Fade>
                                <div className='header-burger-menu-item'>
                                    <img className={lang==='kg'?'header-share-mobile-select':'header-share-mobile'} src={Kg} onClick={()=>{setData({name: 'Язык', data: 'kg'});}}/>
                                    <img className={lang===undefined||lang==='ru'?'header-share-mobile-select':'header-share-mobile'} src={Ru} onClick={()=>{setData({name: 'Язык', data: 'ru'});}}/>
                                    <img className={lang==='eng'?'header-share-mobile-select':'header-share-mobile'} src={Eng} onClick={()=>{setData({name: 'Язык', data: 'eng'});}}/>
                                </div>
                                <div className='header-divider-mobile1'/>
                                </>
                                :
                                null
                            }
                        </div>
                </Rotate>
                </>
            );
        } else return null
    }
)

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
