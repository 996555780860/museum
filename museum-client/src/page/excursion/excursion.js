import React, { useState, useEffect } from 'react';
import './excursion.css';
import { getOther } from '../../redux/actions/app'
import ExcursionItem from '../../component/excursionitem/ExcursionItem'
import Masonry from 'react-masonry-component';
import { connect } from 'react-redux'

const ExcursionInfo =  React.memo(
    (props) =>{
        const { lang } = props.app;
        let [excursion, setExcursion] = useState([]);
        useEffect(()=>{(async ()=>{
            let data = await getOther({name: 'Экскурсии'});
            await setExcursion(data);
        })()},[])
        console.log(excursion)
        return (
            <div className='excursioninfo'>
                <div className='textlinebig'>
                    {lang===undefined||lang==='ru'? 'ЭКСКУРСИИ' : lang==='kg'? 'ЭКСКУРСИИ' : 'EXCURSION' }
                </div>
                <div className='excursioninfo-name' style={{marginTop: '50px'}}>
                    {lang===undefined||lang==='ru'? 'Экспозиционные темы ( с учетом возрастной категории)' : lang==='kg'? 'Экспозиционные темы ( с учетом возрастной категории)' : 'Exposure themes' }
                </div>
                    <Masonry className='excursioninfo-masonry'>
                        {excursion!=undefined&&excursion.length>0 ? (excursion).map((element, idx) => {
                                return <ExcursionItem element={element} idx={idx}/>
                            })
                            :
                            null
                        }
                    </Masonry>
            </div>
        );
    }
)

function mapStateToProps (state) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(ExcursionInfo);
