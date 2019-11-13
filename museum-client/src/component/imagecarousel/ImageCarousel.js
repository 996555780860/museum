import React, {useState} from 'react';
import './ImageCarousel.css';
import Swipe from 'react-easy-swipe';
import Lightbox from 'react-image-lightbox';
import OpenFull from '../../image/openfullimage.svg';

const ImageCarousel =  React.memo(
    (props) =>{
        if(props.images!=undefined&&props.images.length>0){
            let [show, setShow] = useState(false);
            const {imagesThumbnail, images} = props;
            let [position, setPosition] = useState(0);
            let [swipe, setSwipe] = useState(0);

            let swipeStart = (event) => {
                setSwipe(0);
            }

            let swipeEnd = (event) => {
                if(swipe<-150)
                    swipeClick('right')
                else if(swipe>150)
                    swipeClick('left')
                /*else
                    setShow(true)
                */setSwipe(0);
            }


            let swipeMove = (position, event) => {
                setSwipe(position.x)
            }


            let swipeClick = (orientation)=>{
                let mPosition;
                if (orientation === 'left') {
                    mPosition = position-1
                    if (mPosition<0)
                        mPosition = props.images.length-1
                } else if(orientation === 'right') {
                    mPosition = position+1
                    if (mPosition>props.images.length-1)
                        mPosition = 0
                    setPosition(mPosition)
                }
                setPosition(mPosition)
            }

            return (
                <Swipe onSwipeMove={swipeMove}  onSwipeStart={swipeStart} onSwipeEnd={swipeEnd} allowMouseEvents={true}>
                    <div className='imagecarousel-museum'>
                        <img className='imagecarousel-museum-carousel' src={imagesThumbnail[position]}  onLoad={(e)=>{if(e.target.src.includes('thumbnail')){e.target.src=images[position]}}}/>
                        <div className='carousel-indicators'>
                            <div style={{textAlign:'center'}}>
                                {images.length>1?images.map(function(d, idx) {
                                    if(idx===position)
                                        return <div className='imagecarousel-indicator-active'/>
                                    else
                                        return <div className='imagecarousel-indicator' onClick={()=>{setPosition(idx)}}/>
                                    })
                                    :
                                    null
                                }
                            </div>
                        </div>
                        <img className='resizer' src={OpenFull} onClick={() => setShow(true)}/>
                        {images.length>1?
                            <>
                                <img className='arrow left' onClick={()=>{swipeClick('left')}} src='https://i.imgur.com/ULPqYm9.png'/>
                                <img className='arrow right' onClick={()=>{swipeClick('right')}} src='https://i.imgur.com/4sHQpiZ.png'/>
                            </>
                            :null}
                        {show?
                            <Lightbox
                                mainSrc={images[position]}
                                onCloseRequest={() => setShow(false)}
                                nextSrc={position+1===images.length?images[0]:images[position+1]}
                                prevSrc={position-1<0?images[images.length-1]:images[position-1]}
                                onMovePrevRequest={() =>
                                    swipeClick('left')
                                }
                                onMoveNextRequest={() =>
                                    swipeClick('right')
                                }
                            />
                            :
                            null
                        }
                    </div>
                </Swipe>
            );
        } else {
            return null;
        }
    }
)

export default ImageCarousel;
