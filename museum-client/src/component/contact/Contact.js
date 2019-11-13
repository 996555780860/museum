import React, {useState, useEffect} from 'react';
import './Contact.css';
import { connect } from 'react-redux'
import Slide from 'react-reveal/Slide';
import { Map, YMaps, Placemark } from 'react-yandex-maps';
import { mainWindow } from '../../App';

const Contact = React.memo(
    (props)=>{
        const { museum, lang } = props.app;
        let phonenumber = [], url = [], email = [];
        if(museum!=undefined) {
            if (museum.phonenumber != undefined)
                phonenumber = museum.phonenumber.split(', ');
            if (museum.url != undefined)
                url = museum.url.split(', ');
            if (museum.email != undefined)
                email = museum.email.split(', ');
            return (
                <YMaps>
                <div className='contact'>
                    <Slide left>
                    <div className='contact-text textlinestandart'>
                        <div className='textlinebig'>{lang===undefined||lang==='ru'? 'Наши контакты' : lang==='kg'? 'Наши контакты' : 'Our contacts'}</div><br/>
                        {lang===undefined||lang==='ru'? 'Адрес' : lang==='kg'? 'Адрес' : 'Adress'}:<br/>
                        <a className='link-white' href='https://yandex.kg/maps/-/CBFyMZC7KB'>{museum.adress}</a><br/><br/>
                        {lang===undefined||lang==='ru'? 'Тел' : lang==='kg'? 'Тел' : 'Phone'}:<br/>
                        {
                            (phonenumber).map((element) =>
                                <div>{element}</div>
                            )
                        }
                        <br/>
                        Web:<br/>
                        {
                            (url).map((element) =>
                                <a className='link-white' href={'http://'+element}>{element}</a>
                            )
                        }
                        <br/><br/>
                        E-mail:<br/>
                        {
                            (email).map((element) =>
                                <div>{element}</div>
                            )
                        }
                        <br/>
                    </div>
                    </Slide>
                    <Slide right>
                        <div className='contact-map'>
                            <Map height={400} width={400} defaultState={{ center: [42.878680, 74.611276], zoom: 17 }} >
                                <Placemark geometry={[42.878680, 74.611276]} />
                            </Map>
                        </div>
                    </Slide>
                    <div style={{color: 'white'}}>Made by DASERON</div>
                    <div className='soros-foot'>
                        <img className='soros-logo' src='/FSK-logo_vert_2c_RGB.png'/>
                        <div className='work-with-soros'>
                            {lang===undefined||lang==='ru'? 'Сайт разработан при поддержке Фонда «Сорос-Кыргызстан». Мнения, выраженные на сайте, не обязательно отражают точку зрения Фонда «Сорос-Кыргызстан»'
                                :
                                lang==='kg'? 'Сайт «Сорос-Кыргызстан» Фондунун каржылык жардамы менен түзүлгөн. Сайттагы жарыяланган ойлор «Сорос-Кыргызстан» Фондунун көз карашын билдирбейт.'
                                    :
                                    'The website was created with the support of the Soros Foundation-Kyrgyzstan. The opinions expressed on the website do not necessarily reflect the point of view of the Soros Foundation-Kyrgyzstan.'}

                        </div>
                        <img className='by-cc-nc' src='/by-nc.png'/>
                        <div className='by-cc-nc-text'>
                            {lang===undefined||lang==='ru'? 'Материалы сайта доступны под открытой лицензией Creative Commons CC BY-NC 4.0. («Атрибуция - Некоммерческое использование»), которая разрешает третьим лицам копировать, перерабатывать, адаптировать произведения для образовательных целей, без права использования в коммерческих целях, с обязательной ссылкой на Кыргызский национальный музей изобразительных искусств (КНМИИ) имени Гапара Айтиева. при этом все права собственности сохраняются за КНМИИ.'
                                :
                                lang==='kg'? 'Сайттын материалдары Creative Commons CC BY-NC 4.0 ачык лицензиясынын алдында жайгаштырылып, аларды Г. Айтиев атындагы Кыргыз улуттук көркөм сүрөт искусство музейинин атын милдеттүү түрдө шилтеме берүү менен билим берүү/алуу максатында көчүрүүгө, адаптациялоого, туунду чыгармаларды түзүүгө, коммерциялык максаттардан тышкары, пайдаланууга мүмкүндүк берилет.'
                                    :
                                    'The materials on the site are available under the Creative Commons CC BY-NC 4.0 license (Attribution - Non-Commercial Use), which allows third parties to copy, process, adapt works for educational purposes only, without permissions to use them for commercial purposes, with a mandatory link to the Kyrgyz National Museum of Fine Arts named after Gapar Aitiev, taking into account that all property rights are reserved by the KNMFA.'}

                        </div>
                    </div>
                </div>
                </YMaps>
            )
        }
        else return null
    }
)

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(Contact);
