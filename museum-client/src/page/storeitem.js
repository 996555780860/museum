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
            let data = await getOther({name: 'ТоварID', data: {id: props.location.pathname.split('/')[2]}});
            await setSelectedArtwork(data)
        })()},[]);
        let [selectedArtwork, setSelectedArtwork] = useState({});
        if(selectedArtwork.name!=undefined){
            return (
                <Fade>
                <div>
                    <Image imageThumbnail={selectedArtwork.image_thumbnail} image={selectedArtwork.image}/>
                    <About type='Товар' element = {selectedArtwork}/>
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
