const readlineSync = require('readline-sync');

class Tools {
    words;
    id;

    constructor() {
        this.words = [];
        this.id = -1;
    }
    
    mainMenuSelect() {
        // this.words.push();
    }

    exitByEnter() {
        let exit = true;
        
        while(exit){
            const pressKey = readlineSync.question('\n계속하려면 엔터키를 누르세요.');
            if(pressKey === '')
            {
                exit = false;
            }
        }
        
    }

    // #name;
    // year;

    // constructor(name, year){
    //     this.#name = name;
    //     this.year = year;
    // }

    get getId() {
        return this.id;
    }

    set setId(id) {
        this.id += id;
    }

    get getWord() {
        return this.words;
    }

    set setWord(word){
        this.words.push(word);
    }
}

module.exports = Tools;