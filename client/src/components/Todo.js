import React from 'react';
import TodoDelete from './TodoDelete';
import TodoUpdate from './TodoUpdate';
import './Todo.css';

class Todo extends React.Component {

    // todos의 상태 변경이 있을때만 업데이트하기
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.todos !== nextProps.todos;
    }

    constructor(props) {
        super(props);
        this.state = {
            todos: this.props.todos
        }
        this.toggleTodo = this.toggleTodo.bind(this)
    }

    // 
    toggleTodo = (todo) => {
        const URL = '/api/todos/toggle/' + todo.id + '/' + todo.checked;
        fetch(URL, {
            method: 'PUT'
        });
    }
    render() {
        const todos = this.props;
        const dateFunc = () => {
            let date = '';
            if(todos.deadline !== '') {
                const parseDate = new Date(Date.parse(todos.deadline));
                date = parseDate.getFullYear() + '. ' + (parseDate.getMonth() +1 ) + '. ' + parseDate.getDate();
            }
            else {
                date = '- - -'
            }
            return date;
        }
        return (
           <div className="todo-item" onClick={(e) => {
                                        e.stopPropagation()
                                        this.props.handleToggle(todos.id)
                                        this.toggleTodo(todos)
                                        }} >
                <div className={`todo-text ${todos.checked && 'checked'}`} >
                    <div><h3>{ todos.title }</h3></div>
                    { (todos.deadline !== undefined) && <div className="deadline">{ dateFunc() }</div> }
                    <div>{ todos.memo }</div>
               </div>
               { todos.checked ? <div className="check-mark">✓</div> : null }
               <TodoUpdate stateRefresh={this.props.stateRefresh} todos={todos} />
               <TodoDelete stateRefresh={this.props.stateRefresh} id={todos.id}/>
           </div>
        )
    }
}

export default Todo