import React, { useState } from "react";
import "./TodoInsert.css"

const TodoInsert = ({onInsertTodo}) => {
    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault(); //form의 새로고침 방지
        onInsertTodo(value);
        setValue('');
    }
    return (
        <div>
            <div className="background">
            <form className="inputButton" onSubmit={onSubmit}>
                <input className="Input" value={value} onChange={onChange} type="text" placeholder="입력하시오"></input>
                <button className="Button" type="submit">추가</button>
            </form>
            </div>
        </div>
    );
}

export default TodoInsert;