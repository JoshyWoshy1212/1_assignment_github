const Tools = require('./tools');

const readlineSync = require('readline-sync');
const { clear } = require('console');

class Menu {
    mainMenu() {
        console.log(`
=== 단어 찾기 게임 ===

1. 게임 시작
2. 단어 설정
0. 게임 종료
        `)
        const tools = new Tools;
        tools.mainMenuSelect();
    };
    
    gameStart() {

    };

    wordSetting() {
        console.log(`
=== 단어 설정 메뉴 ===

1. 단어 목록 확인
2. 단어 추가
3. 단어 삭제
0. 메뉴로 돌아가기
        `)
    };

    currentWord () {
        console.log(`
=== 현재 단어 목록 ===     
        `)
    };

    addWord() {
        console.clear();
        const tools = new Tools;
        const pressWord = readlineSync.question('추가할 단어를 입력하세요: ');
        tools.setWord = pressWord;
        tools.setId = 1;
        console.log(`단어 [${tools.getWord[tools.getId]}]가 추가되었습니다`);

        tools.exitByEnter();
    };

    wordDelete () {
        console.log(`
=== 단어 삭제 ===     
        `)
    };

    wrongNum() {

    };
}

module.exports = Menu;