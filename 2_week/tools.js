// const readline = require('readline');

class Tools {

    idLoader;
    wList;

    constructor() {
        this.idLoader = -1;
        this.wList = [
            'TEST',
            'JAVASCRIPT',
            'TYPESCRIPT',
            'NUMBER',
            //dumydata
        ];
    }

    timer() {
        let count = 8;
        let randomWord = this.wList[Math.floor(Math.random() * this.wList.length)];
        let wordHint = '_'.repeat(randomWord.length).split('');
        let wrongWord = [];

        function gameMenu() {
            console.clear();
            console.log(`
=== 단어 찾기 게임 ===
남은 시간: ${count}
단어:${wordHint.join(' ')}
입력한 글자:${wrongWord.join(', ') || '없음'}
        `)};

        const timerSet = setInterval(() => {
            count--;
            gameMenu();

            if(count <= 0) {
                clearInterval(timerSet);
                console.log(`시간이 초과되었습니다. 실패! 정답은 ${randomWord}였습니다.`)
            }
        }, 1000);

        async function pressWords() {
            if(count <= 0) return;

            const word = readlineSync.question('글자를 입력하세요: ');
            if (randomWord.includes(word)) {
                for(let i = 0; i < randomWord.length; i++) {
                    if ( randomWord[i] === word) wordHint[i] === word;
                }
            } else {
                if(!wrongWord.includes(word)) {
                    wrongWord.push(word);
                }
            }

            gameMenu();        

            if(!wordHint.includes('_')) {
                clearInterval(timerSet);
                console.log(`축하합니다! 단어 [${randomWord}]를 맞추셨습니다!`)
            } else {
                pressWords();
            }
        }
    };

    get getWord() {
        return this.wList;
    }

    set setWord(word) {
        this.idLoader++;
        this.wList.push(word);
    }

    set setDeleteWord(num) {
        this.idLoader--;
        this.wList.splice(num - 1, 1);
    }
}

module.exports = Tools;