import React from 'react';
import Axios from 'axios';
import './Todo.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@material-ui/core';


class TodoAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            memo: '',
            deadline: '',
            open: false
        }
        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleValueChange(e) {
        let nextState = {}
        nextState[e.target.name] = e.target.value
        this.setState(nextState)
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const URL = '/api/todos';
        const data = {
            title: this.state.title,
            memo: this.state.memo,
            deadline: this.state.deadline
        }
        Axios.post( URL, data )
            .then((response) => {
                console.log(response);
                this.props.staetRefresh();
            });
        this.setState({
            title: '',
            memo: '',
            deadline: '',
            open: false
        });
    }

    handleClickOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            title: '',
            memo: '',
            deadline: '',
            open: false
        });
    }

    render() {
        const { title, memo, deadline, open } = this.state;
        return (
            <div>
                <Button className="insertButton" variant="contained" color="primary" onClick={this.handleClickOpen} >
                    <h3>Add Todo</h3>
                </Button>
                <Dialog open={open} onClose={this.handleClose} >
                    <DialogTitle>일정 추가</DialogTitle>
                    <DialogContent>
                        제목 <br /><TextField label="title" type="text" name="title" value={title} onChange={this.handleValueChange} /> <br /><br />
                        내용 <br /><TextField label="memo" type="text" name="memo" value={memo} onChange={this.handleValueChange} /> <br /><br />
                        마감일 <br /><br /><TextField type="date" name="deadline" value={deadline} onChange={this.handleValueChange} /> <br /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>Insert</Button>
                        <Button variant="contained" color="secondary" onClick={this.handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}

export default TodoAdd