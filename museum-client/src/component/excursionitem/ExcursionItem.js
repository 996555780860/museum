import React from 'react';
import './ExcursionItem.css';
import { connect } from 'react-redux'

const ExcursionItem =  React.memo(
    (props) =>{
        let {element} = props;
        const { lang } = props.app;
        return(
            <div className='excursioninfo-line-item'>
                <div className='excursioninfo-line-item-name'>
                    {lang===undefined||lang==='ru'? element[0].type_ru : lang==='kg'? element[0].type_kg : element[0].type_eng}
                </div>
                {
                    (element).map((element) => {
                        return (<div className='excursioninfo-line-item-value textlinestandart'>{'• '+(lang===undefined||lang==='ru'? element.name_ru : lang==='kg'? element.name_kg : element.name_eng)}</div>)
                    })
                }
            </div>
        )
    }
)

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(ExcursionItem);
