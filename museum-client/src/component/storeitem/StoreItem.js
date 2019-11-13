import React from 'react';
import './StoreItem.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../redux/actions/app'
import { Link } from 'react-router-dom'
import { scrollToTop } from '../../App'

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
            <Link className='link-black' to={'/storeitem/'+element._id} onClick={scrollToTop()}>
            <div className={hideItem}>
                <img className='galleryitem-line-item-image' src={element.image_thumbnail}/>
                <div className='galleryitem-line-item-name link'>
                    {element.name}
                </div>
                <div className='galleryitem-item-property textlinestandart'>
                    <div>
                        <div className='galleryitem-line-item-property-name'>
                            Материал:
                        </div>
                        <div className='galleryitem-line-item-property-value'>
                            {element.styleOrMaterial}
                        </div>
                    </div>
                    <div>
                        <div className='galleryitem-line-item-property-name'>
                            Год:
                        </div>
                        <div className='galleryitem-line-item-property-value'>
                            {element.date}
                        </div>
                    </div>
                    <div>
                        <div className='galleryitem-line-item-property-name'>
                            Автор:
                        </div>
                        <div className='galleryitem-line-item-property-value'>
                            {element.author}
                        </div>
                    </div>
                    <div>
                        <div className='galleryitem-line-item-property-name'>
                            Цена:
                        </div>
                        <div className='galleryitem-line-item-property-value'>
                            {element.price}
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
