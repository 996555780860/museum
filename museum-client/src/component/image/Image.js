import React, {useState} from 'react';
import './Image.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import OpenFull from '../../image/openfullimage.svg';

const Image =  React.memo(
    (props) =>{
        const {imageThumbnail, image} = props;
        let [show, setShow] = useState(false);
        return (
            <div style={{width: '100%', background: '#FAFAFA'}}>
                <div className='image-box'>
                    <img className='imagem'  src={imageThumbnail}  onLoad={(e)=>{if(e.target.src.includes('thumbnail')){e.target.src=image}}} onClick={() => setShow(true)}/>
                    <img className='resizer' src={OpenFull} onClick={() => setShow(true)}/>
                </div>
                {show?
                    <Lightbox
                        mainSrc={image}
                        onCloseRequest={() => setShow(false)}
                    />
                    :
                    null
            }
            </div>);
    }
)

export default Image;
