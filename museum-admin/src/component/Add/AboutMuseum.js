import React, { useState, useEffect } from 'react';
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
    urls: {
        margin: theme.spacing.unit,
        width: width,
        maxHeight: 100,
        overflow: 'auto'
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

        let [biography_ru, setBiography_ru] = useState(selected!==-1?data[selected][1]:'');
        let handleBiography_ru =  (event) => {
            setBiography_ru(event.target.value)
        };
        let [biography_kg, setBiography_kg] = useState(selected!==-1?data[selected][2]:'');
        let handleBiography_kg =  (event) => {
            setBiography_kg(event.target.value)
        };
        let [biography_eng, setBiography_eng] = useState(selected!==-1?data[selected][3]:'');
        let handleBiography_eng =  (event) => {
            setBiography_eng(event.target.value)
        };
        let [file, setFile] = useState([]);
        let [fileNames, setFileNames] = useState(selected!==-1?data[selected][0]:'');
        let handleChangeFile = (async (event) => {
            setFile(event.target.files)
            let fileNames='';
            for(let i=0; i<event.target.files.length; i++){
                if(i!==0)
                    fileNames+=', '
                fileNames+=event.target.files[i].name+','
            }
            setFileNames(fileNames)
        })

        const { classes } = props;
        return (
            <div>
                <TextField
                    multiline
                    rowsMax='4'
                    label='биография'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={biography_ru}
                    onChange={handleBiography_ru}
                />
                <br/>
                <TextField
                    multiline
                    rowsMax='4'
                    label='өмүр баяны'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={biography_kg}
                    onChange={handleBiography_kg}
                />
                <br/>
                <TextField
                    multiline
                    rowsMax='4'
                    label='biography'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={biography_eng}
                    onChange={handleBiography_eng}
                />
                <br/>
                <div className={classes.urls}>
                    {fileNames}
                </div>
                <br/>
                <label htmlFor='contained-button-file'>
                    <Button variant='contained' color={fileNames.length>0?'primary':''} component='span' className={classes.button}>
                        Загрузить изображение
                    </Button>
                </label>
                <br/>
                <div>
                    <Button variant='contained' color='primary' onClick={()=>{
                        while(biography_ru.includes('\n'))
                            biography_ru = biography_ru.replace('\n', '<br/>');
                        while(biography_eng.includes('\n'))
                            biography_eng = biography_eng.replace('\n', '<br/>');
                        while(biography_kg.includes('\n'))
                            biography_kg = biography_kg.replace('\n', '<br/>');
                        if(selected===-1)
                            addData({search: search, sort: sort, page: page, name: 'О музее', file: file, data: {biography_ru: biography_ru, biography_kg: biography_kg, biography_eng: biography_eng}});
                        else
                            setData({id: data[selected][5], search: search, sort: sort, page: page, name: 'О музее', oldFile: data[selected][0], file: file, data: {biography_ru: biography_ru, biography_kg: biography_kg, biography_eng: biography_eng}});
                        setSelected(-1)
                        showMiniDialog(false)}} className={classes.button}>
                        Сохранить
                    </Button>
                    <Button variant='contained' color='secondary' onClick={()=>{setSelected(-1); showMiniDialog(false)}} className={classes.button}>
                        Отмена
                    </Button>
                </div>
                <input
                    accept='image/*'
                    style={{ display: 'none' }}
                    id='contained-button-file'
                    multiple
                    type='file'
                    onChange={handleChangeFile}
                />
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