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
    error_message: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        color: 'red',
        fontWeight: 'bold'
    },
    urls: {
        margin: theme.spacing.unit,
        width: width,
        maxHeight: 100,
        overflow: 'auto'
    },
    menu: {
        width: 200,
    }
});

const Sign =  React.memo(
    (props) =>{
        const { showMiniDialog } = props.mini_dialogActions;
        const { setSelected, addData, setData } = props.tableActions;
        const { selected, data, ids, page, search, sort } = props.table;
        let [name, setName] = useState(selected!==-1?data[selected][1]:'');
        let handleName =  (event) => {
            setName(event.target.value)
        };
        let [styleOrMaterial, setStyleOrMaterial] = useState(selected!==-1?data[selected][2]:'');
        let handleStyleOrMaterial =  (event) => {
            setStyleOrMaterial(event.target.value)
        };
        let [description, setDescription] = useState(selected!==-1?data[selected][3]:'');
        let handleDescription =  (event) => {
            setDescription(event.target.value)
        };
        let [date, setDate] = useState(selected!==-1?data[selected][4]:'');
        let handleDate =  (event) => {
            setDate(event.target.value)
        };
        let [author, setAuthor] = useState(selected!==-1?data[selected][5]:'');
        let handleAuthor =  (event) => {
            setAuthor(event.target.value)
        };
        let [price, setPrice] = useState(selected!==-1?data[selected][6]:'');
        let handlePrice =  (event) => {
            setPrice(event.target.value)
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
                    label='имя'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={name}
                    onChange={handleName}
                />
                <br/>
                <TextField
                    label='материал/стиль'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={styleOrMaterial}
                    onChange={handleStyleOrMaterial}
                />
                <br/>
                <TextField
                    multiline
                    rowsMax='4'
                    label='описание'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={description}
                    onChange={handleDescription}
                />
                <br/>
                <TextField
                    label='год исполнения'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={date}
                    onChange={handleDate}
                />
                <br/>
                <TextField
                    label='автор'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={author}
                    onChange={handleAuthor}
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
                        while(description.includes('\n'))
                            description = description.replace('\n', '<br/>');
                        if(selected===-1)
                            addData({search: search, sort: sort, page: page, name: 'Товары', file: file, data: {name: name, styleOrMaterial: styleOrMaterial, price: price, date: date, description: description, author: author}});
                        else
                            setData({id: data[selected][8], search: search, sort: sort, page: page, name: 'Товары', oldFile: data[selected][0], file: file, data: {name: name, styleOrMaterial: styleOrMaterial, price: price, date: date, description: description, author: author}});
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