const readlineSync = require('readline-sync');

const todos = [];

let id = 0;
let text = '';
let completed = false;
let priority = 'low';

class toDoList {
    id;
    text;
    completed;
    priority;

    constructor(id, text, completed, priority) {
        this.id = id;
        this.text = text;
        this.completed = completed;
        this.priority = priority;
    }
}

function filterPriorityToKr(prior) {
    if(prior === 'low') {
        return '낮음';
    } else if(prior === 'medium') {
        return '중간';
    } else if(prior === 'high') {
        return '높음';
    } else {
        return '낮음';
    }
}

function filterPriorityToEn(prior) {
    if (prior === '낮음') {
        return 'low';
    } else if (prior === '중간') {
        return 'medium';
    } else if (prior === '높음') {
        return 'high';
    } else {
        return 'low';
    }
}

function add() {
    id++;
    let keyText = readlineSync.question('새 To-Do를 입력하세요: ');
    let keyPriority = readlineSync.question('우선순위를 입력하세요 (낮음, 중간, 높음):');
    if(keyPriority === '') {
        keyPriority = 'low';
    }

    keyPriority = filterPriorityToEn(keyPriority);

    const addplus = new toDoList(
        id,
        text = keyText,
        completed,
        priority = keyPriority,
    );

    todos.push(addplus);
    console.log(`추가 완료! (ID: ${id}, 내용: ${keyText}, 우선순위: ${filterPriorityToKr(keyPriority)})`);
    console.log(todos);
    };

add();