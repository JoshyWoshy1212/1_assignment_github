const Menu = require('./menu');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Start {
    menu;

    constructor() {
        this.menu = new Menu;
    }

    theStarter() {
        this.menu.showMainMenu();
        rl.question('메뉴 선택: ', this.mainMenuLoader.bind(this));
        //bind를 활용하지 않으면 rl.question이 콜백할 떄, this가 start
        //class의 인스턴스를 가리키지 않게 된다.(this의 컨텍스트가 유지되지 않는다)
        //화살표 함수를 통한 this.mainmenuloader(press);
    }

    mainMenuLoader(press) {
        switch(press) {
            case '1':
                this.menu.gameStart();
                break;
            case '2':
                this.menu.showWordSetting();
                rl.question('메뉴 선택: ', (press) => {
                    this.wordMenuLoader(press);
                })
                break;
            case '0':
                console.clear();
                console.log('End Game');
                rl.close();
                break;
            default:
                console.clear();
                this.menu.showMainMenu();
                console.log('오류: 유효하지 않은 선택입니다. (0, 1, 2 중 선택)');
                rl.question('계속하려면 엔터키를 누르세요.', () => {
                    this.theStarter();  
                });
                break;
        }
    }

    wordMenuLoader(press) {
        console.clear();
        this.menu.showWordSetting();

        switch(press) {
            case '1':
                this.menu.currentWord();
                break;
            case '2':
                this.menu.addWord();
                break;
            case '3':
                this.menu.wordDelete();
                break;
            case '0':
                this.theStarter();
                break;
            default:
                rl.question('오류: 유효하지 않은 선택입니다. (0, 1, 2, 3 중 선택)\n계속하려면 엔터키를 누르세요.', (press) => {
                    if(press === '') {
                        this.wordMenuLoader();
                    } else {
                        this.wordMenuLoader('default');
                    }                  
                });
                break;
        }
    }
}

const theStarter = new Start;
theStarter.theStarter();