import React from 'react';
import './GalleryItem.css';
import { Link } from 'react-router-dom'
import { scrollToTop } from '../../App'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../redux/actions/app'
import { getOther } from '../../redux/actions/app'

const GalleryItem =  React.memo(
    (props) =>{
        const { lang } = props.app;
        let {element, idx} = props;
        let hideItem = 'galleryitem-line-item';
        if(idx===2)
            hideItem = 'galleryitem-line-item hide-item2'
        else if(idx===3)
            hideItem = 'galleryitem-line-item hide-item1'
        return(
            <Link className='link-black' to={'/artwork/'+element._id} onClick={()=>{scrollToTop(); getOther({name: 'Просмотр', data: element._id})}}>
            <div className={hideItem}>
                <img className='galleryitem-line-item-image' src={element.image_whatermar_thumbnail}/>
                <div className='galleryitem-line-item-name link'>
                        {lang===undefined||lang==='ru'? element.name_ru : lang==='kg'? element.name_kg : element.name_eng}
                </div>
                <div className='galleryitem-item-property textlinestandart'>
                    <div>
                        <div className='galleryitem-line-item-property-name'>
                            {lang===undefined||lang==='ru'? 'Автор' : lang==='kg'? 'Автор' : 'Author'}:
                        </div>
                        <Link className='link-black' to={element.author!=undefined?'/author/'+element.author._id:''} onClick={()=>{scrollToTop();}}>
                        <div className='galleryitem-line-item-property-value link'>
                            {element.author!=undefined?element.author.name:null}
                        </div>
                        </Link>
                    </div>
                    <div>
                        <div className='galleryitem-line-item-property-name'>
                            {lang===undefined||lang==='ru'? 'Годы жизни' : lang==='kg'? 'Годы жизни' : 'Years of life'}:
                        </div>
                        <div className='galleryitem-line-item-property-value'>
                            {element.author!=undefined?element.author.yearsOfLife:null}
                        </div>
                    </div>
                    <div>
                        <div className='galleryitem-line-item-property-name'>
                            {lang===undefined||lang==='ru'? 'Жанр' : lang==='kg'? 'Жанр' : 'Genre'}:
                        </div>
                        <div className='galleryitem-line-item-property-value'>
                            {lang===undefined||lang==='ru'? element.genre1 : lang==='kg'? element.genre1_kg : element.genre1_eng}
                        </div>
                    </div>
                    <div>
                        <div className='galleryitem-line-item-property-name'>
                            {lang===undefined||lang==='ru'? 'Период' : lang==='kg'? 'Период' : 'Period'}:
                        </div>
                        <div className='galleryitem-line-item-property-value'>
                            {element.date}
                        </div>
                    </div>
                    <div>
                        <div className='galleryitem-line-item-property-name'>
                            {lang===undefined||lang==='ru'? 'Год' : lang==='kg'? 'Год' : 'Year'}:
                        </div>
                        <div className='galleryitem-line-item-property-value'>
                            {element.year}
                        </div>
                    </div>
                    <div>
                        <div className='galleryitem-line-item-property-name'>
                            {lang===undefined||lang==='ru'? 'Материал' : lang==='kg'? 'Материал' : 'Material'}:
                        </div>
                        <div className='galleryitem-line-item-property-value'>
                            {lang===undefined||lang==='ru'? element.styleOrMaterial_ru : lang==='kg'? element.styleOrMaterial_kg : element.styleOrMaterial_eng}
                        </div>
                    </div>
                    <div>
                        <div className='galleryitem-line-item-property-name'>
                            {lang===undefined||lang==='ru'? 'Просмотры' : lang==='kg'? 'Просмотры' : 'Views'}:
                        </div>
                        <div className='galleryitem-line-item-property-value'>
                            {element.views==undefined?'0':element.views}
                        </div>
                    </div>
                </div>
            </div>
            </Link>
        )
    }
)

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GalleryItem);
