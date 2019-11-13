import React, { useState, useEffect }  from 'react';
import './UpSite.css';
import UpArrow from '../../image/vverhstrelka.svg'

const UpSite =  React.memo(
    () =>{
        let handleScroll =  async () => {
            setVisible(window.pageYOffset>window.outerHeight+100)
            //setVisible(true)
        };
        let scrollToTop =  async () => {
            await window.scrollTo(0, 0);
        };
        let [visible, setVisible] = useState(false);
        useEffect(()=>{
            window.addEventListener('scroll', handleScroll);
            return ()=>{
                window.removeEventListener('scroll', handleScroll);
            }
        });

        return(
            <>
            {visible?<img className='upsite' src={UpArrow} onClick={()=>{scrollToTop()}}/>:null}
            </>
        )
    }
)

export default UpSite;
