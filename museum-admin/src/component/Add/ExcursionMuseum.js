import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import * as tableActions from '../../redux/actions/table'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { mainWindow } from '../../App'
const width = mainWindow.current.offsetWidth>800? 500: (mainWindow.current.offsetWidth-144);

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: width,
    },
    error_message: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        color: 'red',
        fontWeight: 'bold'
    },
});

const Sign =  React.memo(
    (props) =>{
        const { showMiniDialog } = props.mini_dialogActions;
        const { setSelected, addData, setData } = props.tableActions;
        const { selected, data, page, search, sort } = props.table;

        let [type_ru, setType_ru] = useState(selected!==-1?data[selected][1]:'');
        let handleType_ru =  (event) => {
            setType_ru(event.target.value)
        };
        let [name_ru, setName_ru] = useState(selected!==-1?data[selected][0]:'');
        let handleName_ru =  (event) => {
            setName_ru(event.target.value)
        };
        let [type_kg, setType_kg] = useState(selected!==-1?data[selected][3]:'');
        let handleType_kg =  (event) => {
            setType_kg(event.target.value)
        };
        let [name_kg, setName_kg] = useState(selected!==-1?data[selected][2]:'');
        let handleName_kg =  (event) => {
            setName_kg(event.target.value)
        };
        let [type_eng, setType_eng] = useState(selected!==-1?data[selected][5]:'');
        let handleType_eng =  (event) => {
            setType_eng(event.target.value)
        };
        let [name_eng, setName_eng] = useState(selected!==-1?data[selected][4]:'');
        let handleName_eng =  (event) => {
            setName_eng(event.target.value)
        };

        const { classes } = props;
        return (
            <div>
                <TextField
                    label='имя'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={name_ru}
                    onChange={handleName_ru}
                />
                <br/>
                <TextField
                    label='тип'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={type_ru}
                    onChange={handleType_ru}
                />
                <br/>
                <TextField
                    label='ысым'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={name_kg}
                    onChange={handleName_kg}
                />
                <br/>
                <TextField
                    label='түрү'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={type_kg}
                    onChange={handleType_kg}
                />
                <br/>
                <TextField
                    label='name'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={name_eng}
                    onChange={handleName_eng}
                />
                <br/>
                <TextField
                    label='type'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={type_eng}
                    onChange={handleType_eng}
                />
                <br/>
                <br/>
                <div>
                    <Button variant='contained' color='primary' onClick={()=>{
                        if(selected===-1)
                            addData({search: search, sort: sort, page: page, name: 'Экскурсия', data: {name_ru: name_ru, type_ru: type_ru, name_kg: name_kg, type_kg: type_kg, name_eng: name_eng, type_eng: type_eng}});
                        else
                            setData({id: data[selected][7], search: search, sort: sort, page: page, name: 'Экскурсия', data: {name_ru: name_ru, type_ru: type_ru, name_kg: name_kg, type_kg: type_kg, name_eng: name_eng, type_eng: type_eng}});
                        setSelected(-1)
                        showMiniDialog(false)}} className={classes.button}>
                        Сохранить
                    </Button>
                    <Button variant='contained' color='secondary' onClick={()=>{setSelected(-1); showMiniDialog(false)}} className={classes.button}>
                        Отмена
                    </Button>
                </div>
            </div>
        );
    }
)

function mapStateToProps (state) {
    return {
        mini_dialog: state.mini_dialog,
        table: state.table,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
        tableActions: bindActionCreators(tableActions, dispatch),
    }
}

Sign.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Sign));