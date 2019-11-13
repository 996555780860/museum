import React from 'react';
import './CutImage.css';
import { Link } from 'react-router-dom'
import Image from '../../image/banya.jpg';
import { connect } from 'react-redux'

const CutImage  = React.memo(
    (props)=>{
        const { lang } = props.app;
        return (
            <div>
            <div className='cutterimage-div-mobile'/>
            <div className='cutterimage-div'>
                <img className='cutterimage' src={Image}/>
                <div className='cutterimage-item-1 cutterimage-item'>
                    <Link className='link-white' to='/events'>
                        {lang===undefined||lang==='ru'? <>ВЫСТАВКИ И<br/>СОБЫТИЯ</> : lang==='kg'? 'КӨРГӨЗМӨСҮ' : <>EXHIBITIONS &<br/>EVENTS</> }
                    </Link>
                </div>
                <div className='cutterimage-item cutterimage-item-2'>
                    <Link className='link-white' to='/about'>
                        {lang===undefined||lang==='ru'? 'О МУЗЕЕ' : lang==='kg'? 'МУЗЕЙ' : 'ABOUT'}
                    </Link>
                </div>
                <div className='cutterimage-item cutterimage-item-3'>
                    <Link className='link-white' to='/genre'>
                        {lang===undefined||lang==='ru'? 'ГАЛЕРЕЯ' : lang==='kg'? 'ГАЛЕРЕЯ' : 'GALLERY' }
                    </Link>
                </div>
            </div>
            </div>
        )
    }
)

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(CutImage);
