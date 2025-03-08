import React, { use, useState } from "react";
import './TodoItem.css'

const TodoItem = ({ todo, onCheckToggle, deleteTodo }) => {
    const {id, text, checked} = todo;
    return (
        <div className="TodoItem">
            <div className={`content ${checked ? 'checked' : ''}`}>
                {checked ? '🟢': '🔘'}
                <div className="text">{text}</div>
                {checked ? '' : 
                <div className="check" onClick={() => onCheckToggle(id)}>✅</div>}
                <div className="unCheck" onClick={() => deleteTodo(id)}>❌</div>
            </div>
        </div>
    );
};

export default TodoItem;