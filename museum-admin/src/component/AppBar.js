import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../redux/actions/user'
import * as appActions from '../redux/actions/app'
import * as mini_dialogActions from '../redux/actions/mini_dialog'
import Sign from './Sign';
import logo from '../logo.png';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { mainWindow } from '../App'
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

const styles = {
    appBar: {
        zIndex: 1201,
        background: '#202124'
    },
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        width: 30,
        marginLeft: 10,
        marginRight: 20,
    },
};

const MyAppBar = (
    (props) =>{
        const { authenticated } = props.user;
        const { classes } = props;
        const { logout } = props.userActions;
        const { name } = props.table;
        const { drawer } = props.app;
        const { showDrawer } = props.appActions;
        const { setMiniDialog, showMiniDialog, showAddMiniDialog } = props.mini_dialogActions;
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        let handleMenu = (event) => {
            setAnchorEl(event.currentTarget);
        }
        let handleClose = () => {
            setAnchorEl(null);
        }
        return (
                <div>
                    <div className={classes.root}>
                        <AppBar position='fixed' className={classes.appBar}>
                            <Toolbar>
                                <img src={logo} className={classes.menuButton}  onClick={() => {showDrawer(!drawer)}}/>
                                <Typography variant='h6' color='inherit' className={classes.grow}  onClick={showAddMiniDialog}>
                                    DsrAdmin
                                </Typography>
                                {mainWindow.current.offsetWidth>450?
                                    authenticated ?
                                        <div>
                                            {name!='' ?
                                                <Button  variant='outlined' color='inherit' onClick={showAddMiniDialog} style={{marginRight: '20px'}}>Добавить</Button>
                                                :
                                                null
                                            }
                                            <Button  variant='outlined' color='inherit' onClick={logout}>Выйти</Button>
                                        </div>
                                        :
                                        <Button  variant='outlined' color='inherit' onClick={()=>{setMiniDialog('Авторизация', <Sign/>);showMiniDialog(true)}}>Войти</Button>
                                    :
                                    <div>
                                        <IconButton
                                            aria-owns={open ? 'menu-appbar' : undefined}
                                            aria-haspopup='true'
                                            onClick={handleMenu}
                                            color='inherit'
                                        >
                                            <AccountCircle />
                                        </IconButton>
                                        <Menu
                                            id='menu-appbar'
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={open}
                                            onClose={handleClose}
                                        >
                                            {authenticated ?
                                                <>
                                                {name!='' ?
                                                    <MenuItem onClick={()=>{handleClose(); showAddMiniDialog()}}>Добавить</MenuItem>
                                                    :
                                                    null
                                                }
                                                <MenuItem onClick={()=>{handleClose(); logout()}}>Выйти</MenuItem>
                                                </>
                                                :
                                                <MenuItem onClick={()=>{handleClose();setMiniDialog('Авторизация', <Sign/>);showMiniDialog(true)}}>Войти</MenuItem>
                                            }
                                        </Menu>
                                    </div>
                                }
                            </Toolbar>
                        </AppBar>
                    </div>
                </div>
        )
    }
)

MyAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps (state) {
    return {
        table: state.table,
        app: state.app,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyAppBar))