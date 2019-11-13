import React, {useState, useEffect} from 'react';
import Image from '../component/image/Image';
import { connect } from 'react-redux'
import About from '../component/about/About';
import Other from '../component/other/Other';
import Fade from 'react-reveal/Fade';
import { getOther } from '../redux/actions/app'

const Artwork = React.memo(
    (props) =>{
        useEffect(()=>{(async ()=>{
            let data = await getOther({name: 'Произведение', data: {id: props.location.pathname.split('/')[2]}});
            await setSelectedArtwork(data)
        })()},[props.location.pathname]);
        let [selectedArtwork, setSelectedArtwork] = useState({});
        console.log(selectedArtwork)
        if(selectedArtwork.name_ru!=undefined){
            return (
                <Fade>
                <div>
                    <Image imageThumbnail={selectedArtwork.image_whatermar_thumbnail} image={selectedArtwork.image_whatermark}/>
                    <About type='Произведение' element = {selectedArtwork}/>
                    <Other title = {'ПРОИЗВЕДЕНИЯ ПО АВТОРУ'} meta = {selectedArtwork.author._id} id = {selectedArtwork._id}/>
                    <Other title = {'ПРОИЗВЕДЕНИЯ ПО ЖАНРУ'} meta = {selectedArtwork.genre._id} id = {selectedArtwork._id}/>
                    <Other title = {'ПРОИЗВЕДЕНИЯ ПО ГОДУ'} meta = {selectedArtwork.date.split('T')[0].split('-')[0]} id = {selectedArtwork._id}/>
                </div>
                </Fade>
            );
        } else
            return null
    })

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(Artwork);
