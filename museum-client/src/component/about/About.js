import React from 'react';
import './About.css';
import { month } from '../../redux/constants/other'
import { connect } from 'react-redux'
import renderHTML from 'react-render-html';
import { Link } from 'react-router-dom'
import { scrollToTop } from '../../App'

const about =  React.memo(
    (props) =>{
        const { lang } = props.app;
        const {type, element} = props;
        let dateStart
        let timeStart
        let dateEnd
        if(type=='Событие'){
            dateStart = element.dateStart.split('T')[0].split('-')
            timeStart = element.dateStart.split('T')[1].split(':')
            dateEnd = element.dateEnd.split('T')[0].split('-')
        }
            return (
                <div className='about-museum'>
                    <div className='about-second textlinestandart'>
                        <div className='about-second-text'>
                            <div className='textlinebig about-name' style={{display: 'inline-block'}}>
                                {lang===undefined||lang==='ru'? element.name_ru : lang==='kg'? element.name_kg : element.name_eng }
                                {element.name===undefined? null : element.name }
                            </div>
                        </div>
                        <br/>
                        {type=='Автор'?
                            <>
                            <div className='about-second-text'>
                                <div className='about-property-name'>{lang===undefined||lang==='ru'? 'Годы жизни' : lang==='kg'? 'Жашоонун жыл' : 'Years of life'}:</div> {element.yearsOfLife}<br/>
                                {(lang===undefined||lang==='ru'? element.biography_ru[0] : lang==='kg'? element.biography_kg[0] : element.biography_eng[0])!==''?
                                    <>
                                    <br/>
                                    <div>
                                        {renderHTML(element.biography_ru!==undefined?lang===undefined||lang==='ru'? element.biography_ru : lang==='kg'? element.biography_kg : element.biography_eng:'')}
                                    </div>
                                    </>
                                    :
                                    null
                                }
                            </div>
                            </>:null}
                        {type=='Событие'?
                            <>
                            <div className='about-second-text'>
                                <div className='about-property-name'>{lang===undefined||lang==='ru'? 'Тип' : lang==='kg'? 'Түрү' : 'Type'}:</div> {lang===undefined||lang==='ru'? element.type_ru : lang==='kg'? element.type_kg : element.type_eng} <br/>
                                <div className='about-property-name'>{lang===undefined||lang==='ru'? 'Дата начала' : lang==='kg'? 'Дата' : 'Date'}:</div> { (parseInt(timeStart[0])+6)+':'+timeStart[1]+ ', ' + dateStart[2]+' '+month[dateStart[1]]}<br/>
                                <div className='about-property-name'>{lang===undefined||lang==='ru'? 'Дата окончания' : lang==='kg'? 'Дата окончания' : 'Date'}:</div> {dateEnd[2]+' '+month[dateEnd[1]]}<br/>
                                {(lang===undefined||lang==='ru'? element.description_ru[0] : lang==='kg'? element.description_kg[0] : element.description_eng[0])!==''?
                                    <>
                                    <br/>
                                    <div>
                                        {renderHTML(element.description_ru!==undefined?lang===undefined||lang==='ru'? element.description_ru : lang==='kg'? element.description_kg : element.description_eng:'')}
                                    </div>
                                    </>
                                    :
                                    null
                                }
                            </div>
                            </>:null}
                        {type=='Произведение'?
                            <>
                            <div className='about-second-text'>
                                <div className='about-property-name'>{lang===undefined||lang==='ru'? 'Автор' : lang==='kg'? 'Автор' : 'Author'}:</div><Link className='link-black link' to={element.author!=undefined?'/author/'+element.author._id:''} onClick={()=>{scrollToTop();}}>{element.author!=undefined?element.author.name:null}</Link><br/>
                                <div className='about-property-name'>{lang===undefined||lang==='ru'? 'Годы жизни' : lang==='kg'? 'Годы жизни' : 'Years of life'}:</div> {element.author!=undefined?element.author.yearsOfLife:null}<br/>
                                <div className='about-property-name'>{lang===undefined||lang==='ru'? 'Период' : lang==='kg'? 'Период' : 'Period'}:</div> {element.date} <br/>
                                <div className='about-property-name'>{lang===undefined||lang==='ru'? 'Год' : lang==='kg'? 'Год' : 'Year'}:</div> {element.year} <br/>
                                <div className='about-property-name'>{lang===undefined||lang==='ru'? 'Материал' : lang==='kg'? 'Материал' : 'Material'}:</div> {lang===undefined||lang==='ru'? element.styleOrMaterial_eng : lang==='kg'? element.styleOrMaterial_kg : element.styleOrMaterial_eng} <br/>
                                <div className='about-property-name'>{lang===undefined||lang==='ru'? 'Жанр' : lang==='kg'? 'Жанр' : 'Genre'}:</div>{lang===undefined||lang==='ru'? element.genre1 : lang==='kg'? element.genre1_kg : element.genre1_eng}<br/>
                                <div className='about-property-name'>{lang===undefined||lang==='ru'? 'Просмотры' : lang==='kg'? 'Просмотры' : 'Views'}:</div> {element.views==undefined?'0':element.views} <br/>
                                <div className='about-property-name'>{lang===undefined||lang==='ru'? 'Инвентарный номер' : lang==='kg'? 'Жолу саны' : 'Inventory number'}:</div> {element.in} <br/>
                                <div className='about-property-name'>{lang===undefined||lang==='ru'? 'Размер' : lang==='kg'? 'Размер' : 'Size'}:</div> {element.size} <br/>
                                {(lang===undefined||lang==='ru'? element.description_ru[0] : lang==='kg'? element.description_kg[0] : element.description_eng[0])!==''?
                                    <>
                                    <br/>
                                    <div>
                                        {renderHTML(element.description_ru!==undefined?lang===undefined||lang==='ru'? element.description_ru : lang==='kg'? element.description_kg : element.description_eng:'')}
                                    </div>
                                    </>
                                    :
                                    null
                                }
                            </div>
                            </>:null
                        }
                        {type=='Товар'?
                            <>
                            <div className='about-second-text'>
                                <div className='about-property-name'>Материал:</div> {element.styleOrMaterial}<br/>
                                <div className='about-property-name'>Год:</div> {element.date} <br/>
                                <div className='about-property-name'>Автор:</div> {element.author} <br/>
                                <div className='about-property-name'>Цена:</div> {element.price}<br/>
                                {element.description[0]!==''?
                                    <>
                                    <br/>
                                    <div>
                                        {renderHTML(element.description!==undefined?element.description:'')}
                                    </div>
                                    </>
                                    :
                                    null
                                }
                            </div>
                            </>:null
                        }
                    </div>
                </div>
            );
        }
)

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(about);
