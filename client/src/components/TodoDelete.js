import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from '@material-ui/core';
import './Todo.css';

class TodoDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
    }

    handleClickOpen() {
        this.setState({
            open: true
        })
    }
    handleClose() {
        this.setState({
            open: false
        })
    }

    deleteTodo(id) {
        const URL = '/api/todos/' + id;
        fetch(URL, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return (
            <div>
                <div className="remove" onClick={this.handleClickOpen} > 삭제 </div>
                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <DialogTitle>
                        <h3>삭제 경고</h3>
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>선택한 일정이 삭제됩니다.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteTodo(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default TodoDelete;