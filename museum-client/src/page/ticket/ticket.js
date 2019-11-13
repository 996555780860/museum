import React, { useState, useEffect } from 'react';
import './ticket.css';
import TicketComp from '../../image/comp.png';
import TicketMobile from '../../image/mobile.png';
import {mainWindow} from '../../App';
import Fade from 'react-reveal/Fade';

const ExcursionInfo =  React.memo(
    () =>{
        let [res, setRes] = useState(undefined);
        useEffect( ()=>{
            if(mainWindow.current.clientWidth>800)
                setRes(TicketComp)
            else if(mainWindow.current.clientWidth<800)
                setRes(TicketMobile)
            },[mainWindow])
        return (
            <Fade>
                <div>
                    <div className='textlinebig' style={{marginTop: '50px'}}>
                        БИЛЕТЫ
                    </div>
                    <div className='ticket'>
                        <img className='ticket-image' src={res}/>
                    </div>
                </div>
            </Fade>
        );
    }
)

export default ExcursionInfo;
