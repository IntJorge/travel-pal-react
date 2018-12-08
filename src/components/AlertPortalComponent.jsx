import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertPortalComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isOpen, title, description, onDismiss } = this.props;
        
        return (
            <Dialog
                open={isOpen}
                onClose={onDismiss}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{ title }</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    { description }
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={onDismiss} color="primary">
                    Close
                </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AlertPortalComponent;