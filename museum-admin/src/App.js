import React, { lazy, Suspense, useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from './redux/actions/user'
import CircularProgress from '@material-ui/core/CircularProgress';

const AppBar = lazy(() => import('./component/AppBar'));
const Table = lazy(() => import('./component/Table'));
const Drawer = lazy(() => import('./component/Drawer'));
const Dialog = lazy(() => import('./component/Dialog'));
export const mainWindow = React.createRef();

const App = React.memo(
    (props) =>{
        const { checkAuthenticated } = props.userActions;
        const { load } = props.table;
        useEffect(()=>{
            checkAuthenticated();
        },[])
        return (
              <div ref={mainWindow} className='App'>
                    <Suspense fallback={null}>
                      <AppBar/>
                    </Suspense>
                  <Suspense fallback={null}>
                      <Drawer/>
                  </Suspense>
                  <div className='App-body'>
                      <Suspense fallback={null}>
                        <Table/>
                      </Suspense>
                  </div>
                  <Suspense fallback={null}>
                      <Dialog/>
                  </Suspense>
                  {load?
                      <div style={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          <CircularProgress/>
                      </div>
                      :
                      null
                  }
              </div>
        );
  })

function mapStateToProps (state) {
    return {
        user: state.user,
        table: state.table,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
