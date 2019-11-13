import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../../redux/actions/mini_dialog'
import * as tableActions from '../../redux/actions/table'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
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
        const { setSelected, addData, setData, getIds } = props.tableActions;
        const { selected, data, ids, page, search, sort } = props.table;
        useEffect(()=>{
            getIds('Произведение');
        },[])
        let [name_ru, setName_ru] = useState(selected!==-1?data[selected][2]:'');
        let handleName_ru =  (event) => {
            setName_ru(event.target.value)
        };
        let [styleOrMaterial_ru, setStyleOrMaterial_ru] = useState(selected!==-1?data[selected][3]:'');
        let handleStyleOrMaterial_ru =  (event) => {
            setStyleOrMaterial_ru(event.target.value)
        };
        let [description_ru, setDescription_ru] = useState(selected!==-1?data[selected][4]:'');
        let handleDescription_ru =  (event) => {
            setDescription_ru(event.target.value)
        };
        let [name_kg, setName_kg] = useState(selected!==-1?data[selected][5]:'');
        let handleName_kg =  (event) => {
            setName_kg(event.target.value)
        };
        let [styleOrMaterial_kg, setStyleOrMaterial_kg] = useState(selected!==-1?data[selected][6]:'');
        let handleStyleOrMaterial_kg =  (event) => {
            setStyleOrMaterial_kg(event.target.value)
        };
        let [description_kg, setDescription_kg] = useState(selected!==-1?data[selected][7]:'');
        let handleDescription_kg =  (event) => {
            setDescription_kg(event.target.value)
        };
        let [name_eng, setName_eng] = useState(selected!==-1?data[selected][8]:'');
        let handleName_eng =  (event) => {
            setName_eng(event.target.value)
        };
        let [styleOrMaterial_eng, setStyleOrMaterial_eng] = useState(selected!==-1?data[selected][9]:'');
        let handleStyleOrMaterial_eng =  (event) => {
            setStyleOrMaterial_eng(event.target.value)
        };
        let [description_eng, setDescription_eng] = useState(selected!==-1?data[selected][10]:'');
        let handleDescription_eng =  (event) => {
            setDescription_eng(event.target.value)
        };
        let [size, setSize] = useState(selected!==-1?data[selected][11]:'');
        let handleSize =  (event) => {
            setSize(event.target.value)
        };
        let dates = ['Современное искусство', 'Кыргызское искусство 1930-2019гг.', 'Русское искусство XVIII–XX вв.', 'Советское русское искусство 1920-1980гг.', 'Искусство народов СССР 1950-2015 гг.', 'Зарубежное искусство XVI-XXI вв.', 'Другое']
        let [date, setDate] = useState(selected!==-1?data[selected][12]:'');
        let handleDate =  (event) => {
            setDate(event.target.value)
        };
        let [year, setYear] = useState(selected!==-1?data[selected][13]:'');
        let handleYear =  (event) => {
            setYear(event.target.value)
        };
        let [author, setAuthor] = useState(selected!==-1?data[selected][15].split('\n')[1]:'');
        let handleAuthor =  (event) => {
            setAuthor(event.target.value)
        };
        let [genre, setGenre] = useState(selected!==-1?data[selected][16].split('\n')[1]:'');
        let handleGenre =  (event) => {
            setGenre(event.target.value)
        };
        let [genre1, setGenre1] = useState(selected!==-1?data[selected][17]:'');
        let handleGenre1 =  (event) => {
            setGenre1(event.target.value)
        };
        let [genre1_kg, setGenre1_kg] = useState(selected!==-1?data[selected][18]:'');
        let handleGenre1_kg =  (event) => {
            setGenre1_kg(event.target.value)
        };
        let [genre1_eng, setGenre1_eng] = useState(selected!==-1?data[selected][19]:'');
        let handleGenre1_eng =  (event) => {
            setGenre1_eng(event.target.value)
        };
        let [in1, setIn1] = useState(selected!==-1?data[selected][20]:'');
        let handleIn1 =  (event) => {
            setIn1(event.target.value)
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
                    select
                    label='тип'
                    className={classes.textField}
                    value={genre}
                    onChange={handleGenre}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin='normal'
                >
                    {ids.GenreArtworkMuseum != undefined?
                        ids.GenreArtworkMuseum.map(option => (
                            <MenuItem key={option._id} value={option._id}>
                                {`${option.name_ru}|${option.name_kg}|${option.name_eng}`}
                            </MenuItem>
                        ))
                        :
                        null
                    }
                </TextField>
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
                    label='материал/стиль'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={styleOrMaterial_ru}
                    onChange={handleStyleOrMaterial_ru}
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
                    label='материалдык/стили'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={styleOrMaterial_kg}
                    onChange={handleStyleOrMaterial_kg}
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
                    label='material/style'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={styleOrMaterial_eng}
                    onChange={handleStyleOrMaterial_eng}
                />
                <br/>
                <TextField
                    multiline
                    rowsMax='4'
                    label='баяндоо'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={description_eng}
                    onChange={handleDescription_eng}
                />
                <br/>
                <TextField
                    label='размер'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={size}
                    onChange={handleSize}
                />
                <br/>
                <TextField
                    label='жанр'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={genre1}
                    onChange={handleGenre1}
                />
                <br/>
                <TextField
                    label='жанр_kg'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={genre1_kg}
                    onChange={handleGenre1_kg}
                />
                <br/>
                <TextField
                    label='genre'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={genre1_eng}
                    onChange={handleGenre1_eng}
                />
                <br/>
                <TextField
                    select
                    label='период создания'
                    className={classes.textField}
                    value={date}
                    onChange={handleDate}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin='normal'
                >
                    {dates.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))
                    }
                </TextField>
                <br/>
                <TextField
                    label='год исполнения'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={year}
                    onChange={handleYear}
                />
                <br/>
                <TextField
                    select
                    label='автор'
                    className={classes.textField}
                    value={author}
                    onChange={handleAuthor}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin='normal'
                >
                    {ids.AuthorArtworkMuseum != undefined?
                        ids.AuthorArtworkMuseum.map(option => (
                            <MenuItem key={option._id} value={option._id}>
                                {option.name}
                            </MenuItem>
                        ))
                        :
                        null
                    }
                </TextField>
                <br/>
                <TextField
                    label='номер'
                    type='login'
                    className={classes.textField}
                    margin='normal'
                    value={in1}
                    onChange={handleIn1}
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
                            addData({search: search, sort: sort, page: page, name: 'Произведение', file: file, data: {in: in1, year: year, genre1: genre1, genre1_kg: genre1_kg, genre1_eng: genre1_eng, name_ru: name_ru, name_kg: name_kg, name_eng: name_eng, styleOrMaterial_ru: styleOrMaterial_ru, styleOrMaterial_kg: styleOrMaterial_kg, styleOrMaterial_eng: styleOrMaterial_eng, size: size, date: date, description_kg: description_kg, description_ru: description_ru, description_eng: description_eng,author: author, genre: genre}});
                        else
                            setData({id: data[selected][22], search: search, sort: sort, page: page, name: 'Произведение', oldFile: data[selected][0], oldFileWhatermark: data[selected][1], file: file, data: {in: in1, year: year, genre1: genre1, genre1_kg: genre1_kg, genre1_eng: genre1_eng, name_ru: name_ru, name_kg: name_kg, name_eng: name_eng, styleOrMaterial_ru: styleOrMaterial_ru, description_kg: description_kg, description_ru: description_ru, description_eng: description_eng,styleOrMaterial_kg: styleOrMaterial_kg, styleOrMaterial_eng: styleOrMaterial_eng, size: size, date: date, author: author, genre: genre}});
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