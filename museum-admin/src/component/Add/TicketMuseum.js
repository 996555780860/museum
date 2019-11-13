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

        let [genre_ru, setGenre_ru] = useState(selected!==-1?data[selected][0]:'');
        let handleGenre_ru =  (event) => {
            setGenre_ru(event.target.value)
        };
        let [type_ru, setType_ru] = useState(selected!==-1?data[selected][1]:'');
        let handleType_ru =  (event) => {
            setType_ru(event.target.value)
        };
        let [genre_kg, setGenre_kg] = useState(selected!==-1?data[selected][2]:'');
        let handleGenre_kg =  (event) => {
            setGenre_kg(event.target.value)
        };
        let [type_kg, setType_kg] = useState(selected!==-1?data[selected][3]:'');
        let handleType_kg =  (event) => {
            setType_kg(event.target.value)
        };
        let [genre_eng, setGenre_eng] = useState(selected!==-1?data[selected][4]:'');
        let handleGenre_eng =  (event) => {
            setGenre_eng(event.target.value)
        };
        let [type_eng, setType_eng] = useState(selected!==-1?data[selected][5]:'');
        let handleType_eng =  (event) => {
            setType_eng(event.target.value)
        };
        let [price, setPrice] = useState(selected!==-1?data[selected][6]:'');
        let handlePrice =  (event) => {
            setPrice(event.target.value)
        };

        const { classes } = props;
        return (
            <div>
                <TextField
                    label='жанр'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={genre_ru}
                    onChange={handleGenre_ru}
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
                    label='жанр_kg'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={genre_kg}
                    onChange={handleGenre_kg}
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
                    label='genre'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={genre_eng}
                    onChange={handleGenre_eng}
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
                <TextField
                    label='цена'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={price}
                    onChange={handlePrice}
                />
                <br/>
                <div>
                    <Button variant='contained' color='primary' onClick={()=>{
                        if(selected===-1)
                            addData({search: search, sort: sort, page: page, name: 'Билеты', data: {genre_ru: genre_ru, type_ru: type_ru, genre_kg: genre_kg, type_kg: type_kg, genre_eng: genre_eng, type_eng: type_eng, price: price}});
                        else
                            setData({id: data[selected][8], search: search, sort: sort, page: page, name: 'Билеты', data: {genre_ru: genre_ru, type_ru: type_ru, genre_kg: genre_kg, type_kg: type_kg, genre_eng: genre_eng, type_eng: type_eng, price: price}});
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