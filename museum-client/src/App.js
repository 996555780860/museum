import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from './redux/actions/app'
import { Switch, withRouter, Route } from 'react-router-dom'
import Main from './page/main';
import Genre from './page/genre/genre';
import Event from './page/event';
import About from './page/about/about';
import Artwork from './page/artwork';
import Events from './page/events/events';
import Excursion from './page/excursion/excursion';
import Gallery from './page/gallery/gallery';
import Ticket from './page/ticket/ticket';
import Virtual from './page/virtual/virtual';
import Store from './page/store/store';
import StoreItem from './page/storeitem';
import Author from './page/author';
import Header from './component/header/Header';
import Contact from './component/contact/Contact';
import UpSite from './component/upsite/UpSite';
import Music from './music.mp3';
export const mainWindow = React.createRef();
export const scrollToTop = () => {
    window.scrollTo(0, 0);
}


const App = React.memo(
    (props) =>{
        const { getData } = props.appActions;
        useEffect(()=>{
            getData({name: 'Музей'})
        },[]);
        return (
            <div ref={mainWindow} className='App'>
                <Header/>
                <Switch>
                    <Route  path='/' exact component={Main}/>
                    <Route  path='/genre' component={Genre}/>
                    <Route  path='/event' component={Event}/>
                    <Route  path='/about' component={About}/>
                    <Route  path='/artwork' component={Artwork}/>
                    <Route  path='/events' component={Events}/>
                    <Route  path='/excursion' component={Excursion}/>
                    <Route  path='/gallery/:genre' component={Gallery}/>
                    <Route  path='/ticket' component={Ticket}/>
                    <Route  path='/virtual' component={Virtual}/>
                    <Route  path='/store' component={Store}/>
                    <Route  path='/storeitem' component={StoreItem}/>
                    <Route  path='/author' component={Author}/>
                </Switch>
                <Contact/>
                <UpSite/>
                <audio src={Music} autoPlay loop>
                </audio>
            </div>
        );
    })

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
