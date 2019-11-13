import React, { useState, useEffect } from 'react';
import ImageCarousel from '../../component/imagecarousel/ImageCarousel';
import { getOther } from '../../redux/actions/app'
import './about.css';
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux'
import renderHTML from 'react-render-html';

const Main = React.memo(
    (props) =>{
        const { lang } = props.app;
        let [museum, setMuseum] = useState({});
        useEffect(()=>{(async ()=>{
            let data = await getOther({name: 'О музее'})
            await setMuseum(data)
        })()},[])
        return (
            <Fade>
            <div>
            <div className='textlinebig' style={{marginTop: '50px'}}>
                {lang===undefined||lang==='ru'? 'О МУЗЕЕ' : lang==='kg'? 'МУЗЕЙ' : 'ABOUT'}
            </div>
            <ImageCarousel images = {museum.photos} imagesThumbnail = {museum.photos_thumbnail}/>
            <div className='aboutmuseum-second textlinestandart'>
                <div className='aboutmuseum-worktime'>
                    <div>{lang===undefined||lang==='ru'? <>Музей открыт для посетителей <b>ежедневно</b></> : lang==='kg'? <>Музейдин коноктор үчүн ачык <b> күн сайын </b></> : <>The museum is open to visitors <b> daily </ b></>}</div>
                    <div style={{marginTop:'10px'}}>{lang===undefined||lang==='ru'? <>c <b>10-00 до 18-00</b> без перерыва.</> : lang==='kg'? <>с <b> 10-00 18-00 чейин </b> үзгүлтүксүз.</> : <>c <b> 10-00 to 18-00 </ b> without a break.</>}</div>
                    <div style={{marginTop:'10px'}}>Касса закрывается в <b>17:30</b>.</div>
                </div>
                <br/>
                <div className='aboutmuseum-text'>
                    {renderHTML(museum.biography_ru!==undefined?lang===undefined||lang==='ru'? museum.biography_ru : lang==='kg'? museum.biography_kg : museum.biography_eng:'')}
                </div><br/><br/>
                <div className='aboutmuseum-seealso'>
                    <div className='aboutmuseum-seealso-text'>
                        {lang===undefined||lang==='ru'? 'Посмотрите также' : lang==='kg'? 'Кара' : 'See also'}:
                    </div>
                    <div className='aboutmuseum-seealso-urls'>
                        <a className='aboutmuseum-seealso-url' href='https://muzei-mira.com/'>
                            {lang===undefined||lang==='ru'? 'Музеи мира' : lang==='kg'? 'Дүйнөнүн Музеи' : 'Museums of the world'}:
                        </a>
                        <a className='aboutmuseum-seealso-url' href='https://icom.museum/en/'>
                            ICOM Paris
                        </a>
                        <a className='aboutmuseum-seealso-url' href='http://icom.org.ru/'>
                            ICOM России
                        </a>
                        <a className='aboutmuseum-seealso-url' href='http://museum.kg/'>
                            {lang===undefined||lang==='ru'? 'Государственный исторический музей КР' : lang==='kg'? 'Государственный исторический музей КР' : 'State Historical Museum of the Kyrgyz Republic'}:
                        </a>
                        <a className='aboutmuseum-seealso-url' href='http://www.rusteatr.info/'>
                            {lang===undefined||lang==='ru'? 'Национальный русский театр драмы' : lang==='kg'? 'Улуттук орус драма театры' : 'National Russian Drama Theater'}:
                        </a>
                        <a className='aboutmuseum-seealso-url' href='http://www.operaballet.lg.kg/'>
                            {lang===undefined||lang==='ru'? 'Кыргызский театр оперы и балета' : lang==='kg'? 'Кыргыз опера жана балет театры' : 'Kyrgyz Opera and Ballet Theater'}:
                        </a>
                    </div>
                </div>
            </div>
            </div>
            </Fade>
        );
    })

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(Main);
