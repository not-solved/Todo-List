import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@material-ui/core';
import './Todo.css';
import axios from 'axios';

class TodoUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.todos.id,
            title: this.props.todos.title,
            memo: this.props.todos.memo,
            deadline: this.props.todos.deadline,
            checked: this.props.todos.checked,
            open: false
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const URL = '/api/todos/' + this.state.id;
        console.log(this.state.id);
        const data = {
            title: this.state.title,
            memo: this.state.memo,
            deadline: this.state.deadline,
        }
        axios.put(URL, data)
            .then ((response) => {
                    console.log(response)
                    this.props.stateRefresh();
                })
            .catch(error => console.log(error));
        this.setState({
            todos: '',
            open: false

        })
    }
    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClickOpen() {
        this.setState({
            open: true
        })
    }
    handleClose() {
        this.setState({
            id: '',
            title: '',
            memo: '',
            deadline: '',
            checked: '',
            open: false
        })
    }

    render() {
        const { id, title, memo, deadline, checked, open } = this.state;
        return (
            <div>
                <div className="update" onClick={(e) => {
                                            e.stopPropagation();
                                            this.handleClickOpen();
                                            }} > 수정 </div>
                <Dialog open={open} onClose={this.handleClose}  >
                    <DialogTitle>일정 수정</DialogTitle>
                    <DialogContent>
                        제목 <TextField label="title" type="text" name="title" value={title} onChange={this.handleValueChange} /><br /><br />
                        설명 <TextField label="memo" type="text" name="memo" value={memo} onChange={this.handleValueChange} /><br /><br />
                        마감일 <TextField type="date" name="deadline" value={deadline} onChange={this.handleValueChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit} >Change</Button>
                        <Button variant="contained" color="secondary" onClick={this.handleClose} >Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
} 

export default TodoUpdate