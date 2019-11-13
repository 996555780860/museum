import React, { useState, useEffect } from 'react';
import ImageCarousel from '../../component/imagecarousel/ImageCarousel';
import { getOther } from '../../redux/actions/app'
import Zoom from 'react-reveal/Zoom';
import { connect } from 'react-redux'

const Main = React.memo(
    (props) =>{
        let [virtual, setVirtual] = useState([]);
        const { lang } = props.app;
        useEffect(()=>{(async ()=>{
            let data = await getOther({name: 'Виртуальный музей'})
            await setVirtual(data)
        })()},[])
        return (
            <>
                <br/>
                <br/>
                {
                    virtual.length>0?(virtual).map((element) => {
                        return <Zoom><div>
                        <div className='textlinebig'>{lang===undefined||lang==='ru'? element.name_ru : lang==='kg'? element.name_kg : element.name_eng}</div>
                        <ImageCarousel images = {element.photos} imagesThumbnail = {element.photos_thumbnail}/>
                            <br/></div></Zoom>
                    }):null
                }
            </>
        );
    })

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(Main);
