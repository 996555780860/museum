import React from 'react';
import MUIDataTable from 'mui-datatables';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tableActions from '../redux/actions/table'
import * as mini_dialogActions from '../redux/actions/mini_dialog'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { mainWindow } from '../App'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import logo from '../logo.png';

const message = mainWindow.current.offsetWidth>800?
    <>
    DsrAdmin - не будущее, а настоящее
    <br/>
    <i style={{fontWeight: '500', fontSize: '18px'}}>Для начала выберите пункт в боковом меню</i>
    </>
    :
    <>
    DsrAdmin - не будущее, а настоящее
    <br/>
    <i style={{fontWeight: '500', fontSize: '18px'}}>Для начала нажмите значок и выберите пункт в боковом меню</i>
    </>;
const width = mainWindow.current.offsetWidth>800? 500: 240;
const styles = theme => ({
    mainMessage: {
        backgroundImage: "url('https://i.imgur.com/ZE6v9a9.jpg')",
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    message: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: '20px',
        width: width,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: 'calc((100% - '+width+'px)/2)',
        marginRight: 'calc((100% - '+width+'px)/2)'
    }
});

const Table = React.memo(
    (props) => {
        const { classes } = props;
        let getMuiTheme = () => createMuiTheme({
            overrides: {
                MUIDataTableBodyCell: {
                    root: {
                        textOverflow: 'ellipsis',
                        maxHeight: '500px',
                        maxWidth: '200px',
                        overflow: 'hidden',
                        wordWrap: 'break-word'
                    }
                }

            }
        })
        const { row, count, page, data, data1, name, search, sort } = props.table;
        const { getData, deleteData, setSelected } = props.tableActions;
        const { showAddMiniDialog, setMiniDialog, showMiniDialog } = props.mini_dialogActions;
        const { authenticated } = props.user;
        const options = {
            serverSide: true,
            filterType: 'checkbox',
            filter: false,
            print: false,
            downloadOptions: false,
            rowsPerPage: 10,
            count: count,
            page: page,
            rowsPerPageOptions: false,
            onColumnSortChange: (changedColumn, direction) => {
                getData({search: search, sort: [changedColumn, direction], page: page, name: name})
                setSelected(-1)
            },
            onSearchChange: (searchText) => {
                getData({search: searchText, sort: '', page: 0, name: name})
                setSelected(-1)
            },
            onChangePage: (currentPage) => {
                getData({search: search, sort: sort, page: currentPage, name: name})
                setSelected(-1)
            },
            onRowsDelete: (rowsDeleted) => {
                let deletedId = [], oldFile = '';
                for(let i=0; i<rowsDeleted.data.length; i++){
                    deletedId.push(data[rowsDeleted.data[i].index][data[rowsDeleted.data[i].index].length-1])
                    if(data[rowsDeleted.data[i].index][0]!=undefined&&(data[i][0].includes('http')||data[rowsDeleted.data[i].index][0].includes('https')))
                        oldFile += '\n' + data[rowsDeleted.data[i].index][0]
                }
                deleteData({oldFile: oldFile, search: search, sort: sort, page: page, name: name, deleted: JSON.stringify(deletedId)})
                setSelected(-1)
            },
            onCellClick: (colData, colMeta) => {
                if(colData!=undefined&&!(colData.substring(0, 1).includes('/')||colData.substring(0, 4).includes('http')||colData.substring(0, 5).includes('https'))) {
                    setSelected(colMeta.rowIndex)
                    showAddMiniDialog()
                } else {
                    let images = []
                    for (let i = 0; i<colData.split(',').length; i++)
                        images.push({original: colData.split(',')[i], thumbnail: colData.split(',')[i]})
                    setMiniDialog('Просмотр', <ImageGallery items={images} showThumbnails={false} showFullscreenButton={false} showPlayButton={false} />);
                    showMiniDialog(true)
                }
            },
            onTableChange: (action, tableState) => {
                if(action==='search'&&tableState.searchText===null){
                    getData({search: '', sort: '', page: 0, name: name})
                    setSelected(-1)
                }
            }
        };
        return (
                <>
                    {authenticated&&name!=''?
                        <MuiThemeProvider theme={getMuiTheme()}>
                            <MUIDataTable
                                title={name}
                                data={data1}
                                columns={row}
                                options={options}
                            />
                        </MuiThemeProvider>
                        :
                        <div className={classes.mainMessage}>
                            <div className={classes.message}>
                                <img style={{width:'100px'}} src={logo} /><br/>
                                <br/>
                                {message}
                            </div>
                        </div>
                    }
                </>
            );
        }
)

function mapStateToProps (state) {
    return {
        table: state.table,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
        tableActions: bindActionCreators(tableActions, dispatch),
    }
}

Table.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Table));