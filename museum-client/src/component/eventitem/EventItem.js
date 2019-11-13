import React from 'react';
import './EventItem.css';
import { month } from '../../redux/constants/other'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../../redux/actions/app'
import { scrollToTop } from '../../App'

const EventItem =  React.memo(
    (props) =>{
        let {element, idx, show} = props
        let dateStart = element.dateStart.split('T')[0].split('-')
        const { lang } = props.app;
        let timeStart = element.dateStart.split('T')[1].split(':')
        let dateEnd = element.dateEnd.split('T')[0].split('-')

        return (
            <Link className='link-black' to={'/event/'+element._id} onClick={scrollToTop()}>
            <div className={idx===2&&!show?'event-item event-hide':'event-item'} key={idx.toString()}>
                <img className='event-image' src={element.photos_thumbnail[0]}/>
                <div className='event-name link'>
                        {lang===undefined||lang==='ru'? element.name_ru : lang==='kg'? element.name_kg : element.name_eng }
                </div>
                <div className='event-property textlinestandart'>
                    <div>
                        <div className='event-property-name'>
                            {lang===undefined||lang==='ru'? 'Дата начала' : lang==='kg'? 'Башталыш күнү' : 'Date start'}:
                        </div>
                        <div className='event-property-value'>
                            {(parseInt(timeStart[0])+6)+':'+timeStart[1]+ ', ' + dateStart[2]+' '+month[dateStart[1]]}
                        </div>
                    </div>
                    <div>
                        <div className='event-property-name'>
                            {lang===undefined||lang==='ru'? 'Дата окончания' : lang==='kg'? 'Дата' : 'Date end'}:
                        </div>
                        <div className='event-property-value'>
                            {dateEnd[2]+' '+month[dateEnd[1]]}
                        </div>
                    </div>
                    <div>
                        <div className='event-property-name'>
                            {lang===undefined||lang==='ru'? 'Тип' : lang==='kg'? 'Түрү' : 'Type'}:
                        </div>
                        <div className='event-property-value'>
                            {lang===undefined||lang==='ru'? element.type_ru : lang==='kg'? element.type_kg : element.type_eng}
                        </div>
                    </div>
                </div>
            </div>
            </Link>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(EventItem);
