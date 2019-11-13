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

        let [name_ru, setName_ru] = useState(selected!==-1?data[selected][1]:'');
        let handleName_ru =  (event) => {
            setName_ru(event.target.value)
        };
        let [description_ru, setDescription_ru] = useState(selected!==-1?data[selected][2]:'');
        let handleDescription_ru =  (event) => {
            setDescription_ru(event.target.value)
        };
        let [name_kg, setName_kg] = useState(selected!==-1?data[selected][3]:'');
        let handleName_kg =  (event) => {
            setName_kg(event.target.value)
        };
        let [description_kg, setDescription_kg] = useState(selected!==-1?data[selected][4]:'');
        let handleDescription_kg =  (event) => {
            setDescription_kg(event.target.value)
        };
        let [name_eng, setName_eng] = useState(selected!==-1?data[selected][5]:'');
        let handleName_eng =  (event) => {
            setName_eng(event.target.value)
        };
        let [description_eng, setDescription_eng] = useState(selected!==-1?data[selected][6]:'');
        let handleDescription_eng =  (event) => {
            setDescription_eng(event.target.value)
        };
        let [file, setFile] = useState([]);
        let [fileNames, setFileNames] = useState(selected!==-1&&data[selected][0]!=undefined?data[selected][0]:'');
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
                    label='имя'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={name_ru}
                    onChange={handleName_ru}
                />
                <br/>
                <TextField
                    multiline
                    rowsMax='4'
                    label='описание'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={description_ru}
                    onChange={handleDescription_ru}
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
                    multiline
                    rowsMax='4'
                    label='баяндоо'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={description_kg}
                    onChange={handleDescription_kg}
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
                    multiline
                    rowsMax='4'
                    label='description'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={description_eng}
                    onChange={handleDescription_eng}
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
                        while(description_ru.includes('\n'))
                            description_ru = description_ru.replace('\n', '<br/>');
                        while(description_eng.includes('\n'))
                            description_eng = description_eng.replace('\n', '<br/>');
                        while(description_kg.includes('\n'))
                            description_kg = description_kg.replace('\n', '<br/>');
                        if(selected===-1)
                            addData({search: search, sort: sort, page: page, name: 'Тип произведения', file: file, data: {name_ru: name_ru, description_ru: description_ru, name_kg: name_kg, description_kg: description_kg, name_eng: name_eng, description_eng: description_eng}});
                        else
                            setData({oldFile: data[selected][0], id: data[selected][8], search: search, sort: sort, page: page, name: 'Тип произведения', file: file, data: {name_ru: name_ru, description_ru: description_ru, name_kg: name_kg, description_kg: description_kg, name_eng: name_eng, description_eng: description_eng}});
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
                    multiple={false}
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