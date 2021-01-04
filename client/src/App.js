import React, { Component } from 'react';
import TodoAdd from './components/TodoAdd';
import Todo from './components/Todo';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: ''
        }
        this.handleValueChange = this.handleValueChange.bind(this)
        this.stateRefresh = this.stateRefresh.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
    }


    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    callAPI = async () => {
        const response = await fetch('/api/todos');
        const body = await response.json();
        return body;
    }

    stateRefresh = () => {
        this.setState({
            todos: ''
        })
        this.callAPI()
            .then(response => this.setState({todos: response}))
            .catch(error => console.log(error));
    }

    handleToggle = async (id) => {
        const { todos } = this.state;
        const index = todos.findIndex(todo => todo.id === id);
        const selected = todos[index];
    
        const nextTodos = [...todos];
        nextTodos[index] = {
            ...selected,
            checked: !selected.checked
        };
        this.setState({
            todos: nextTodos
        });
    }

    componentDidMount() {
        this.callAPI()
        .then(response => this.setState({todos: response}))
        .catch(error => console.log(error));
    }

    render() {
        const { todos } = this.state;
        const filteredComponents = (data) => {
            return data.map((c) => {
              return <Todo
                        stateRefresh={this.stateRefresh}
                        callAPI = {this.callAPI}
                        handleToggle = {this.handleToggle}
                        key={c.id}
                        id={c.id}
                        title={c.title}
                        memo={c.memo}
                        deadline={c.deadline}
                        checked={c.checked}
                        todos={data}
                    />
            });
        }
        return (
            <main className="todo-list_template">
                <div className="title">Todo List</div>
                <selection className="form-wraper">
                    { todos ? filteredComponents(todos) : null }
                </selection>
                <TodoAdd staetRefresh={this.stateRefresh} />
            </main>
        );
    }
}

export default App
