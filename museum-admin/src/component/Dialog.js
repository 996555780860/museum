import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as mini_dialogActions from '../redux/actions/mini_dialog'
import * as tableActions from '../redux/actions/table'

const MyDialog =  React.memo(
    (props) =>{
        const { title, child, show } = props.mini_dialog;
        const { showMiniDialog } = props.mini_dialogActions;
        const { setSelected } = props.tableActions;
        return (
                <Dialog
                    open={show}
                    onClose={()=>{setSelected(-1); showMiniDialog(false)}}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'>
                    <DialogTitle onClose={()=>{setSelected(-1); showMiniDialog(false)}}>{title}</DialogTitle>
                    <DialogContent>
                        {child}
                    </DialogContent>
                </Dialog>
        );
    }
)

function mapStateToProps (state) {
    return {
        mini_dialog: state.mini_dialog
    }
}

function mapDispatchToProps(dispatch) {
    return {
        tableActions: bindActionCreators(tableActions, dispatch),
        mini_dialogActions: bindActionCreators(mini_dialogActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDialog);