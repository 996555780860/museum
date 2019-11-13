import React from 'react';
import CutImage from '../component/cutimage/CutImage';
import Other from '../component/other/Other';

const Main = React.memo(
    () =>{
        return (
            <div>
            <CutImage/>
                <Other title = {'ВЫСТАВКИ И СОБЫТИЯ'}/>
                <Other title = {'ГАЛЕРЕЯ'}/>
            </div>
        );
    })

export default Main;
