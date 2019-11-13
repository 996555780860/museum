import React, { useState, useEffect } from 'react';
import './events.css';
import { getOther } from '../../redux/actions/app'
import EventItem from '../../component/eventitem/EventItem'
import Calendar from 'react-calendar';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux'

const Main = React.memo(
    (props) =>{
        let handleScroll = () => {
            if(window.pageYOffset+window.outerHeight===document.documentElement.offsetHeight-506){
                getBy(search, sort, false)
            }
        }
        let [searchTypes, setSearchTypes] = useState('');
        let handleChangeSearchTypes = (event) => {
            setSearchTypes(event.target.value);
        }

        let now = new Date();
        let [search, setSearch] = useState('');
        let [sort, setSort] = useState('');
        let [events, setEvents] = useState([]);
        let [types, setTypes] = useState([]);
        let [date, setDate] = useState(now);
        let [showTypes, setShowTypes] = useState(false);
        let [showCalendar, setShowCalendar] = useState(false);
        let getBy = async (search, sort, news) => {
            let data;
            let _events = [];
            if (!news)
                _events = events;
            else {
                await setSearch(search)
                await setSort(sort)
            }
            data = await getOther({name: 'События', data: {search: search, sort: sort, skip: _events.length}});
            if(news||data.length>0&&_events.filter(element => element._id == data[0]._id).length===0) {
                await Array.prototype.push.apply(_events, data);
                await setEvents(_events);
            }
        }
        useEffect(()=>{
            window.addEventListener('scroll', handleScroll);
            return ()=>{
                window.removeEventListener('scroll', handleScroll);
            }
        })
        useEffect(()=>{(async ()=>{
            await getBy('', '', true)
            await setTypes(await getOther({name: 'ТипыСобытия'}));
        })()},[])
        const { lang } = props.app;
        return (
            <>
            <Fade top>
                <div className='textlinebig' style={{marginTop: '50px'}}>
                    {lang===undefined||lang==='ru'? 'ВЫСТАВКИ И СОБЫТИЯ': lang==='kg'? 'КӨРГӨЗМӨСҮ' : 'EXHIBITIONS & EVENTS'}
                </div>
            </Fade>
                <br/>
                <div>
                    <div style={{display: 'inline-block'}}>
                        <Fade left>
                        <button className='eventlist-select' onClick={()=>{setShowCalendar(!showCalendar);setShowTypes(false)}}>
                            {lang===undefined||lang==='ru'? 'ПО ДАТЕ': lang==='kg'? 'ПО ДАТЕ' : 'BY DATE'}
                        </button>
                        </Fade>
                        {showCalendar?
                            <>
                            <div className='events-subbackground' onClick={()=>{setShowCalendar(false);}}/>
                            <div className='events-subcalendar'>
                                <Calendar
                                    style = {{color: '#dac390'}}
                                    onChange={async (date)=>{
                                        await setShowCalendar(false);
                                        await setDate(date);
                                        await getBy(date, 'date', true);
                                    }}
                                    value={date}
                                />
                            </div>
                            </>
                            :
                            null
                        }
                    </div>
                    <div style={{display: 'inline-block'}}>
                        <Fade right>
                            <button className='eventlist-select' onClick={()=>{setShowTypes(!showTypes);setShowCalendar(false)}}>
                                {lang===undefined||lang==='ru'? 'ПО ТИПУ': lang==='kg'? 'ПО ТИПУ' : 'BY TYPE'}
                            </button>
                        </Fade>
                        {showTypes?
                            <>
                            <div className='events-subbackground' onClick={()=>{setShowTypes(false); setSearchTypes('')}}/>
                            <div className='events-submenu'>
                                <input className='events-submenu-input' type='text' value={searchTypes} onChange={handleChangeSearchTypes}/>
                                <div className='events-submenu-item dont-select-text'
                                     onClick={async ()=>{
                                         await setDate(now);
                                         await getBy('', '', true);
                                         await setShowTypes(false);
                                         await setSearchTypes('')
                                     }}
                                >{lang===undefined||lang==='ru'? 'Все': lang==='kg'? 'Все' : 'All'}</div>
                                {types!=undefined ? (lang===undefined||lang==='ru'? types.ru : lang==='kg'? types.kg : types.eng).map((element) => {
                                        if(element!==undefined?element:''.toLowerCase().includes(searchTypes.toLowerCase()))
                                            return <div className='events-submenu-item dont-select-text'
                                                    onClick={async ()=>{
                                                        await setDate(now);
                                                        await getBy(element, 'type', true);
                                                        await setShowTypes(false);
                                                        await setSearchTypes('')
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
                <div className='eventlist'>
                    {events!=undefined&&events.length>0 ? (events).map((element, idx) => {
                            return <EventItem element={element} idx={idx} show />
                        })
                        :
                        null
                    }
                </div>
            </>
        );
    })

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(Main);
