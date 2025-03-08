import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onCheckToggle }) => {
    return (
        <div>
            {todos.map((todo) => (
                <TodoItem todo={todo} key={todo.id} onCheckToggle={onCheckToggle}/>
            ))}
        </div>
    )
}

export default TodoList;