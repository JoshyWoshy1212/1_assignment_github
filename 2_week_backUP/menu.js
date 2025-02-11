const Tools = require('./tools');
const GameStart = require('./gamestart');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Menu {
    tools = new Tools;
    newGameStart = new GameStart;

    showMainMenu() {
        console.clear();
        console.log(`
            === 단어 찾기 게임 ===
            
            1. 게임 시작
            2. 단어 설정
            0. 게임 종료
        `)
    }

    mainMenu(agru) {
        this.showMainMenu();

        rl.question('메뉴 선택: ', press => {
            if(press === 0 || press === 1 || press === 2) {
                rl.close();
                return agru = press;
            } else {
                this.wrongSelect('main');
                this.tools.exitByEnter();
                rl.close();
            }
        });
    };
    
    gameStart() {
        this.newGameStart.startGame();
        this.tools.exitByEnter();
    };

    wordSetting() {
        let exit = true;

        while(exit) {
            console.clear();
            console.log(`
=== 단어 설정 메뉴 ===

1. 단어 목록 확인
2. 단어 추가
3. 단어 삭제
0. 메뉴로 돌아가기
            `)
            let press = parseInt(readlineSync.question('메뉴 선택: '));
            if(press === 0 || press === 1 || press === 2 || press === 3) {
                exit = false;
                return press;
            } else {
                this.wrongSelect('set');
                this.tools.exitByEnter();
            }
        };
    };

    currentWord () {
        console.clear();
        console.log(`
=== 현재 단어 목록 ===     
        `)
        for(let i = 0; i < this.tools.wList.length; i++)
        {
            console.log(`${i + 1}. ${this.tools.wList[i]}`);
        }
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

    wrongSelect(sel) {
        if(sel === 'main') {
            console.log('오류: 유효하지 않은 선택입니다. (0, 1, 2 중 선택)');
        } else if (sel === 'set'){
            console.log('오류: 유효하지 않은 선택입니다. (0, 1, 2, 3 중 선택)');
        }
    };
}

module.exports = Menu;