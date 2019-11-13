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
    urls: {
        margin: theme.spacing.unit,
        width: width,
        maxHeight: 100,
        overflow: 'auto'
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
        let dateStart1;
        if(selected!==-1) {
            dateStart1 = data[selected][1].replace('.', '-').replace('.', '-').replace(' ', 'T')+':00';
        }
        let [dateStart, setDateStart] = useState(selected!==-1?dateStart1:'2019-01-01T00:00');
        let handleDateStart =  (event) => {
            setDateStart(event.target.value)
        };
        let dateEnd1;
        if(selected!==-1){
            dateEnd1 = data[selected][2].replace('.', '-').replace('.', '-').replace(' ', 'T')+':00';
        }
        let [dateEnd, setDateEnd] = useState(selected!==-1?dateEnd1:'2019-01-01T00:00');
        let handleDateEnd =  (event) => {
            setDateEnd(event.target.value)
        };
        let [name_ru, setName_ru] = useState(selected!==-1?data[selected][3]:'');
        let handleName_ru =  (event) => {
            setName_ru(event.target.value)
        };
        let [type_ru, setType_ru] = useState(selected!==-1?data[selected][4]:'');
        let handleType_ru =  (event) => {
            setType_ru(event.target.value)
        };
        let [description_ru, setDescription_ru] = useState(selected!==-1?data[selected][5]:'');
        let handleDescription_ru =  (event) => {
            setDescription_ru(event.target.value)
        };
        let [name_kg, setName_kg] = useState(selected!==-1?data[selected][6]:'');
        let handleName_kg =  (event) => {
            setName_kg(event.target.value)
        };
        let [type_kg, setType_kg] = useState(selected!==-1?data[selected][7]:'');
        let handleType_kg =  (event) => {
            setType_kg(event.target.value)
        };
        let [description_kg, setDescription_kg] = useState(selected!==-1?data[selected][8]:'');
        let handleDescription_kg =  (event) => {
            setDescription_kg(event.target.value)
        };
        let [name_eng, setName_eng] = useState(selected!==-1?data[selected][9]:'');
        let handleName_eng =  (event) => {
            setName_eng(event.target.value)
        };
        let [type_eng, setType_eng] = useState(selected!==-1?data[selected][10]:'');
        let handleType_eng =  (event) => {
            setType_eng(event.target.value)
        };
        let [description_eng, setDescription_eng] = useState(selected!==-1?data[selected][11]:'');
        let handleDescription_eng =  (event) => {
            setDescription_eng(event.target.value)
        };
        let [file, setFile] = useState([]);
        let [fileNames, setFileNames] = useState(selected!==-1?data[selected][0]:'');
        let handleChangeFile = (async (event) => {
            console.log(event.target.files)
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
                    label='дата начала'
                    type='datetime-local'
                    className={classes.textField}
                    margin='normal'
                    value={dateStart}
                    onChange={handleDateStart}
                />
                <br/>
                <TextField
                    label='дата окончания'
                    type='datetime-local'
                    className={classes.textField}
                    margin='normal'
                    value={dateEnd}
                    onChange={handleDateEnd}
                />
                <br/>
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
                    label='түрү'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={type_kg}
                    onChange={handleType_kg}
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
                    label='type'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={type_eng}
                    onChange={handleType_eng}
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
                            addData({search: search, sort: sort, page: page, name: 'Событие', file: file, data: {name_ru: name_ru, type_ru: type_ru, name_kg: name_kg, type_kg: type_kg,  name_eng: name_eng, type_eng: type_eng, description_kg: description_kg, description_ru: description_ru, description_eng: description_eng, dateStart: dateStart, dateEnd: dateEnd}});
                        else
                            setData({id: data[selected][13], search: search, sort: sort, page: page, name: 'Событие', oldFile: data[selected][0], file: file, data: {name_ru: name_ru, type_ru: type_ru, description_ru: description_ru, name_kg: name_kg, type_kg: type_kg,  description_kg: description_kg, name_eng: name_eng, type_eng: type_eng, description_eng: description_eng, dateStart: dateStart, dateEnd: dateEnd}});
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