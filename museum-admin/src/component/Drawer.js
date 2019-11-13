import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Event from '@material-ui/icons/ListAlt';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { mainWindow } from '../App'
import * as tableActions from '../redux/actions/table'
import * as userActions from '../redux/actions/user'
import * as appActions from '../redux/actions/app'

const drawerWidth = 240;

const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

const MyDrawer = React.memo(
    (props) =>{
        const { drawer } = props.app;
        const { showDrawer } = props.appActions;
        const { getData, setSelected } = props.tableActions;
        const menuItems = [
            {
                'name': 'музей',
                'element'
                    :
                    <div>
                        <ListItem button key={'event'} onClick={()=>{showDrawer(false); setSearchItem(''); getData({search: '', sort: '', page: 0, name: 'Музей'}); setSelected(-1)}}>
                            <ListItemIcon><Event /></ListItemIcon>
                            <ListItemText primary={'Музей'} />
                        </ListItem>
                        <Divider variant="inset"/>
                    </div>,
            },{
            'name': 'произведение',
            'element'
                :
                <div>
                    <ListItem button key={'event'} onClick={()=>{showDrawer(false); setSearchItem(''); getData({search: '', sort: '', page: 0, name: 'Произведение'}); setSelected(-1)}}>
                        <ListItemIcon><Event /></ListItemIcon>
                        <ListItemText primary={'Произведение'} />
                    </ListItem>
                    <Divider variant="inset"/>
                </div>,
        },{
            'name': 'событие',
            'element'
                :
                <div>
                    <ListItem button key={'event'} onClick={()=>{showDrawer(false); setSearchItem(''); getData({search: '', sort: '', page: 0, name: 'Событие'}); setSelected(-1)}}>
                        <ListItemIcon><Event /></ListItemIcon>
                        <ListItemText primary={'Событие'} />
                    </ListItem>
                    <Divider variant="inset"/>
                </div>,
        },{
            'name': 'автор произведения',
            'element'
                :
                <div>
                    <ListItem button key={'event'} onClick={()=>{showDrawer(false); setSearchItem(''); getData({search: '', sort: '', page: 0, name: 'Автор произведения'}); setSelected(-1)}}>
                        <ListItemIcon><Event /></ListItemIcon>
                        <ListItemText primary={'Aвтор произведения'} />
                    </ListItem>
                    <Divider variant="inset"/>
                </div>,
        },{
            'name': 'тип произведения',
            'element'
                :
                <div>
                    <ListItem button key={'event'} onClick={()=>{showDrawer(false); setSearchItem(''); getData({search: '', sort: '', page: 0, name: 'Тип произведения'}); setSelected(-1)}}>
                        <ListItemIcon><Event /></ListItemIcon>
                        <ListItemText primary={'Тип произведения'} />
                    </ListItem>
                    <Divider variant="inset"/>
                </div>,
        },{
            'name': 'экскурсия',
            'element'
                :
                <div>
                    <ListItem button key={'event'} onClick={()=>{showDrawer(false); setSearchItem(''); getData({search: '', sort: '', page: 0, name: 'Экскурсия'}); setSelected(-1)}}>
                    <ListItemIcon><Event /></ListItemIcon>
                        <ListItemText primary={'Экскурсия'} />
                    </ListItem>
                    <Divider variant="inset"/>
                </div>,
        },{
            'name': 'о музее',
            'element'
                :
                <div>
                    <ListItem button key={'event'} onClick={()=>{showDrawer(false); setSearchItem(''); getData({search: '', sort: '', page: 0, name: 'О музее'}); setSelected(-1)}}>
                        <ListItemIcon><Event /></ListItemIcon>
                        <ListItemText primary={'О музее'} />
                    </ListItem>
                    <Divider variant="inset"/>
                </div>,
        },{
                'name': 'товары',
                'element'
                    :
                    <div>
                        <ListItem button key={'event'} onClick={()=>{showDrawer(false); setSearchItem(''); getData({search: '', sort: '', page: 0, name: 'Товары'}); setSelected(-1)}}>
                            <ListItemIcon><Event /></ListItemIcon>
                            <ListItemText primary={'Товары'} />
                        </ListItem>
                        <Divider variant="inset"/>
                    </div>,
            },{
            'name': 'виртуальный музей',
            'element'
                :
                <div>
                    <ListItem button key={'event'} onClick={()=>{showDrawer(false); setSearchItem(''); getData({search: '', sort: '', page: 0, name: 'Виртуальный музей'}); setSelected(-1)}}>
                        <ListItemIcon><Event /></ListItemIcon>
                        <ListItemText primary={'Виртуальный музей'} />
                    </ListItem>
                    <Divider variant="inset"/>
                </div>,
        }]
        const { authenticated } = props.user;
        let [searchItem, setSearchItem] = useState('');
        let handleChangeText =  (event) => {
            setSearchItem(event.target.value)
        };
        const { classes } = props;
        let variant= ''
        if(mainWindow.current.offsetWidth>800)
            variant= 'permanent'
        return (
            <div>
                <Drawer
                    variant= {variant}
                    className={classes.drawer}
                    open={drawer}
                    onClose={()=>showDrawer(false)}
                    classes={{paper: classes.drawerPaper,}}
                >
                    {
                        mainWindow.current.offsetWidth>800?
                            <div className={classes.toolbar}/>
                        :
                            null
                    }
                    {authenticated?
                        <List>
                            <ListItem button key={'search'}>
                                <TextField
                                    id='standard-search'
                                    label='Поиск'
                                    type='search'
                                    className={classes.textField}
                                    margin='normal'
                                    value={searchItem}
                                    onChange={handleChangeText}
                                />
                            </ListItem>
                            <Divider/>
                            {
                                menuItems.map((element) => {
                                    if(searchItem!==''){
                                        if(element.name.includes(searchItem.toLowerCase()))
                                            return(
                                                    element.element
                                            )
                                    } else
                                        return(element.element)
                                })
                            }
                        </List>
                        :
                        null
                    }
                </Drawer>
            </div>
        );
    }
)

function mapStateToProps (state) {
    return {
        app: state.app,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch),
        tableActions: bindActionCreators(tableActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
    }
}

MyDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyDrawer));