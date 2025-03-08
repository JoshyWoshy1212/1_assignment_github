import React from "react";
import './Template.css'

const Template = ({children, todoLength }) => {
    return (
        <div className="Template">
            <div className="title">🗒️To-Do-List
                <br/><span className="howManyList">({todoLength ? `${todoLength}가지 항목이 있습니다` : '입력된 항목이 없습니다'})</span>
            </div>
            <div>{children}</div>
        </div>
    );
}

export default Template;