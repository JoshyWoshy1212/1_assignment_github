const { start } = require('repl');
const Menu = require('./menu');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Start {
    menu = new Menu;
    press;

    constructor() {
        this.press = '';
    }

    theStarter() {
        this.menu.showMainMenu();
        rl.question('메뉴 선택: ', press => {
            this.menuLoader(press);
        })
    }

    menuLoader(press) {
        switch(press) {
            case 1:
                menuPrint.gameStart();
                break;
            case 2:
                let wordSettingExit = true;

                while(wordSettingExit) {

                    const selectWordSetting = menuPrint.wordSetting();

                    switch(selectWordSetting) {
                        case 1:
                            menuPrint.currentWord();
                            break;
                        case 2:
                            menuPrint.addWord();
                            break;
                        case 3:
                            menuPrint.wordDelete();
                            break;
                        case 0:
                            wordSettingExit = false;
                            break;
                    }
                }
                break;
            case 0:
                console.clear();
                console.log('End Game');
                mainMenuExit = false;
                break;
            default:
                start();
                break;
        }
    }
}

const theStarter = new Start;
theStarter.theStarter();

// const start = function () {
//     let mainMenuExit = true;

//     while(mainMenuExit) {
//         const menuPrint = new Menu;
//         let pressKeyBoard
//         menuPrint.mainMenu(pressKeyBoard);

//         switch(pressKeyBoard) {
//             case 1:
//                 menuPrint.gameStart();
//                 break;
//             case 2:
//                 let wordSettingExit = true;

//                 while(wordSettingExit) {

//                     const selectWordSetting = menuPrint.wordSetting();

//                     switch(selectWordSetting) {
//                         case 1:
//                             menuPrint.currentWord();
//                             break;
//                         case 2:
//                             menuPrint.addWord();
//                             break;
//                         case 3:
//                             menuPrint.wordDelete();
//                             break;
//                         case 0:
//                             wordSettingExit = false;
//                             break;
//                     }
//                 }
//                 break;
//             case 0:
//                 console.clear();
//                 console.log('End Game');
//                 mainMenuExit = false;
//                 break;
//             default:
//                 start();
//                 break;
//         }
//     }
// }

// start();