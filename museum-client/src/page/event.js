import React, {useState, useEffect} from 'react';
import ImageCarousel from '../component/imagecarousel/ImageCarousel';
import About from '../component/about/About';
import { connect } from 'react-redux'
import Other from '../component/other/Other';
import Fade from 'react-reveal/Fade';
import { getOther } from '../redux/actions/app'

const event = React.memo(
    (props) =>{
        useEffect(()=>{(async ()=>{
            let data = await getOther({name: 'Событие', data: {id: props.location.pathname.split('/')[2]}});
            await setSelectedEvent(data)
        })()},[props.location.pathname]);
        let [selectedEvent, setSelectedEvent] = useState({});
        if(selectedEvent.name_ru!=undefined)
            return (
                <Fade>
                <div>
                    <ImageCarousel images = {selectedEvent.photos} imagesThumbnail = {selectedEvent.photos_thumbnail}/>
                    <About type='Событие' element = {selectedEvent}/>
                    <Other title = {'ДРУГИЕ СОБЫТИЯ'} id = {selectedEvent._id}/>
                </div>
                </Fade>
            );
        else
            return null;
    })

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(event);
