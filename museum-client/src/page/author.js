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
            let data = await getOther({name: 'Автор', data: {id: props.location.pathname.split('/')[2]}});
            await setSelectedArtwork(data)
        })()},[props.location.pathname]);
        let [selectedArtwork, setSelectedArtwork] = useState({});
        if(selectedArtwork.name!=undefined){
            return (
                <Fade>
                    <div>
                        {/*<Image imageThumbnail={selectedArtwork.photos_thumbnail} image={selectedArtwork.photos}/>*/}
                        <About type='Автор' element = {selectedArtwork}/>
                    </div>
                    <Other title = {'ПРОИЗВЕДЕНИЯ ПО АВТОРУ'} meta = {selectedArtwork._id} id = {selectedArtwork._id}/>
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
