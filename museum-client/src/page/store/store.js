import React, { useState, useEffect } from 'react';
import './gallery.css';
import './gallery2.css';
import {getOther} from '../../redux/actions/app'
import Masonry from 'react-masonry-component';
import StoreItem from '../../component/storeitem/StoreItem'
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux'

const Main = React.memo(
    (props) =>{
        let handleScroll =  async () => {
            if(window.pageYOffset+window.outerHeight>document.documentElement.offsetHeight-506)
                getBy(false)
        }
        const { lang } = props.app;
        let [gallery, setGallery] = useState([]);
        let getBy = async (search, sort, news) => {
            let data;
            let _gallery = gallery;
            data = await getOther({name: 'Товары', data: {skip: _gallery.length}});
            if((news||data.length>0)&&_gallery.filter(element => element._id == data[0]._id).length===0) {
                await Array.prototype.push.apply(_gallery, data);
                await setGallery(_gallery);
                console.log(_gallery)
            }
        };
        useEffect(()=>{
            window.addEventListener('scroll', handleScroll);
            return ()=>{
                window.removeEventListener('scroll', handleScroll);
            }
        });
        useEffect(()=>{(async ()=>{
            await getBy(true)
        })()},[])
            return (
                <>
                <div className='firstseegallery-museum'>
                    <Fade top>
                    <div className='textlinebig fade-in-top'>
                        {lang===undefined||lang==='ru'? 'МАГАЗИН' : lang==='kg'? 'ДҮКӨН' : 'STORE'}
                    </div></Fade><br/>
                </div>
                <div className='secondseegallery-museum'>
                    <div className='secondseegallery-museum-masonry'>
                        <Masonry>
                            {gallery!=undefined&&gallery.length>0 ? (gallery).map((element, idx) => {
                                return (<StoreItem element={element} idx={idx} />)
                                })
                                :
                                null
                            }
                        </Masonry>
                    </div>
                </div>
                </>
            );
    })

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(Main);
