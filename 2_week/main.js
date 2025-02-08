const readlineSync = require('readline-sync');
const { clear } = require('console');
const Menu = require('./menu');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// select.question('메뉴를 선택하세요: ', (answer) => {
//     console.log(`${answer} OK`);
// });
// console.clear();

const start = function () {
    let mainMenuExit = true;

    while(mainMenuExit) {
        console.clear();
        
        const menuPrint = new Menu;
        menuPrint.mainMenu();

        let pressKeyBoard = parseFloat(readlineSync.question('메뉴를 선택하세요: '));

        switch(pressKeyBoard) {
            case 1:
                console.clear();
                menuPrint.gameStart();
                //엔터누를시 넘어감
                break;
            case 2:
                let wordSettingExit = true;
                //엔터누를시 넘어감
                while(wordSettingExit) {
                    console.clear();
                    menuPrint.wordSetting();
                    let selectWordSetting = parseFloat(readlineSync.question('메뉴를 선택하세요: '));
                    
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
                //엔터누를시 넘어감
                mainMenuExit = false;
                break;
            default:
                //엔터누를시 넘어감
                break;
        }
    }
}

start();