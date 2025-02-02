const readlineSync = require('readline-sync');

const menuLog =
    '=== To-Do List 프로그램 ===\n\
    1. 추가\n\
    2. 목록 조회\n\
    3. 수정\n\
    4. 삭제\n\
    5. 완료 표시\n\
    6. 우선순위 정렬\n\
    7. 검색\n\
    0. 종료\n\
===========================';

let id = 0;
let text = '';
let completed = false;
let priority = 'low';

let exit = true;

let todos = [
    // { id: 1, text: '공부', completed: false, priority: 'high' },
    // { id: 2, text: '수학', completed: false, priority: 'low' },
    // { id: 3, text: '중국', completed: false, priority: 'high' },
    // { id: 4, text: '사회', completed: false, priority: 'medium' },
    // { id: 5, text: '과학', completed: false, priority: 'medium' },
    // { id: 6, text: '국어', completed: false, priority: 'low' },
    // { id: 7, text: '일본', completed: false, priority: 'low' },
    //dummy data
];


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

function filterCompletion(complete) {
    if(complete === true) {
        return '✔️  ';
    } else {
        return '✖️  ';
    }
}

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

function add(){
    id++;
    let keyText = readlineSync.question('새 To-Do를 입력하세요: ');
    let keyPriority = readlineSync.question('우선순위를 입력하세요 (낮음, 중간, 높음):');

    keyPriority = filterPriorityToEn(keyPriority);

    const addplus = new toDoList (
        id,
        text = keyText,
        completed,
        priority = keyPriority,
    );

    todos.push(addplus);
    console.log(`추가 완료! (ID: ${id}, 내용: ${keyText}, 우선순위: ${filterPriorityToKr(keyPriority)})`);
};

function lookUp() {
    for(let i = 0; i < todos.length; i++) {
        console.log(`[${i+1}] ${todos[i].text} (우선순위: ${filterPriorityToKr(todos[i].priority)}, 완료: ${filterCompletion(todos[i].completed)})`)
    }
};

function modify() {

    let determine = true;
    let keyId

    while(determine) {
        keyId = parseFloat(readlineSync.question('수정할 To-Do ID를 입력하세요: '));
        todos.map((x) => {
            if(x.id === keyId) {
                determine = false;
            }
        })
        if (determine === true) {
            console.log('오류: 해당 ID의 To-Do가 존재하지 않습니다.');
        }
    }
    
    let keyText = readlineSync.question('새로운 내용을 입력하세요: ');
    let keyPriority = readlineSync.question('새로운 우선순위를 입력하세요 (낮음, 중간, 높음): ');

    todos[keyId - 1].text = keyText;
    todos[keyId - 1].priority = filterPriorityToEn(keyPriority);

    console.log(`수정 완료! (ID: ${keyId}, 내용: ${todos[keyId - 1].text}, 우선순위: ${todos[keyId - 1].priority})`)
}

function listDelete() {
    let keyId = readlineSync.question('삭제할 To-Do ID를 입력하세요: ');
    todos.splice(keyId-1, 1);

    console.log(`삭제 완료! (ID: ${keyId})`);
}

function correction() {
    let determine = true;
    let keyId

    while(determine) {
        keyId = parseFloat(readlineSync.question('완료로 표시할 To-Do ID를 입력하세요: '));
        todos.map((x) => {
            if(x.id === keyId) {
                determine = false;
            }
        })
        if (determine === true) {
            console.log('오류: 해당 ID의 To-Do가 존재하지 않습니다.');
        }
    }

    todos[keyId-1].completed = true;

    console.log(`완료 처리 완료! (ID: ${keyId})`)
}

function sortByPrior() {
    const newTodos = [];

    todos.map((priority) => {
        if(newTodos.length === 0) {
          newTodos.push(priority)
        } else {
          if(priority.priority === 'low') {
            newTodos.push(priority)
          } else if (priority.priority === 'medium') {
            if(newTodos.find((fi) => fi.priority === 'low')) {
              const findpriorityIndex = newTodos.findIndex((fi) => fi.priority === 'low')
              newTodos.splice(findpriorityIndex, 0, priority)
            } else {
              newTodos.push(priority)
            }
          } else {
            newTodos.unshift(priority)
          }
        }})
    
    todos = newTodos;
    console.log('우선순위별로 정렬되었습니다.');
    lookUp();
}

function search() {
    const newTodos = [];

    let keyword = readlineSync.question('검색할 키워드를 입력하세요: ');

    todos.map((x) => {
        if(x.text.includes(keyword))
            newTodos.push(x);
    });

    console.log('검색 결과:');
    for(let i = 0; i < newTodos.length; i++) {
        console.log(`[${i+1}] ${newTodos[i].text} (우선순위: ${filterPriorityToKr(newTodos[i].priority)}, 완료: ${filterCompletion(newTodos[i].completed)})`)
    };
}

while (exit) {
    
    console.log(menuLog);

    let pressKeyBoard = parseFloat(readlineSync.question('숫자 입력: '));
    
    switch(pressKeyBoard){
        case 1:
            add();
            break;
        case 2:
            lookUp();
            break;
        case 3:
            modify();
            break;
        case 4:
            listDelete();
            break;
        case 5:
            correction();
            break;
        case 6:
            sortByPrior();
            break;
        case 7:
            search();
            break;
        case 0:
            exit = false;
            break;
        default:
            console.log('오류: 유효하지 않은 선택입니다. 0~7 사이의 번호를 입력하세요.');
    }
};
