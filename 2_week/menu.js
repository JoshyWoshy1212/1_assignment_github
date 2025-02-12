const Tools = require('./tools');
const GameStart = require('./gamestart');

// const readline = require('readline');

class Menu {
    tools = new Tools;

    showMainMenu() {
        console.clear();
        console.log('=== 단어 찾기 게임 ===')
        console.log('1. 게임 시작');
        console.log('2. 단어 설정');
        console.log('0. 게임 종료');
    }

    showWordSetting() {
        console.clear();
        console.log('=== 단어 설정 메뉴 ===');
        console.log('1. 단어 목록 확인');
        console.log('2. 단어 추가');
        console.log('3. 단어 삭제');
        console.log('0. 메뉴로 돌아가기');
    }
    
    gameStart() {
        const newGameStart = new GameStart;
        newGameStart.startGame();
        this.tools.exitByEnter();
    };

    currentWord () {
        console.clear();
        console.log('=== 현재 단어 목록 ===');
        for(let i = 0; i < this.tools.wList.length; i++)
        {
            console.log(`${i + 1}. ${this.tools.wList[i]}`);
        };
        this.tools.exitByEnter();
    };

    addWord() {
        console.clear();
        let press = readlineSync.question('추가할 단어를 입력하세요: ');
        this.tools.setWord = press.toUpperCase();
        console.log(`단어 [${press.toUpperCase()}]가 추가되었습니다`);
        this.tools.exitByEnter();
    };

    wordDelete () {
        console.clear();
        console.log(`
=== 단어 삭제 ===     
        `)
        for(let i = 0; i < this.tools.wList.length; i++) {
            console.log(`${i + 1}. ${this.tools.wList[i]}`);
        }
        let press = readlineSync.question('삭제할 단어 번호를 입력하세요: ');
        console.log(`단어 [${this.tools.wList[press - 1]}]가 삭제되었습니다`);
        this.tools.setDeleteWord = press;
        this.tools.exitByEnter();
    };

    exitByEnter() {
        
    };
}

module.exports = Menu;