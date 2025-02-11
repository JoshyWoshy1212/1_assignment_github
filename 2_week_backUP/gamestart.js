const readline = require('readline');
readline.emitKeypressEvents(process.stdin);

const Tool = require('./tools');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

process.stdin.setRawMode(true);

class GameStart {
    tools = new Tool();
    randomWord = this.tools.wList[Math.floor(Math.random() * this.tools.wList.length)];

    constructor() {
        this.count = 8;
        this.randomWord = '';
        this.wordHint = '_'.repeat(this.randomWord.length).split('');
        this.wrongWord = [];
        this.gameClear = false;
    }

    gameMenu() {
        console.clear();
        console.log(`
=== 단어 찾기 게임 ===
남은 시간: ${this.count}초
단어: ${this.wordHint.join(' ')}
입력한 글자: ${this.wrongWord.join(', ') || '없음'}
        `);
    }

    startTimer = setInterval(() => {
        this.count--;
        this.gameMenu();

        if (this.count <= 0) {
            clearInterval(this.timer);
            process.stdin.setRawMode(false);
            console.log(`시간 초과! 정답은 [${this.randomWord}]였습니다.`);
            rl.close();
        } else if (this.gameClear) {
            clearInterval(this.timer);
        }
    }, 1000);   

    pressWords() {
        return new Promise(function(resolve, reject) {
            process.stdin.on('keypress', (word, key) => {
                this.gameMenu();
                console.log('');

                word = word.toUpperCase();
                let know = 0;

                for (let i = 0; i < this.randomWord.length; i++) {
                    if (this.randomWord[i] === word && this.wordHint[i] === '_') {
                        this.wordHint[i] = word;
                        know++;
                    }
                }

                if (know === 0 && !this.wrongWord.includes(word)) {
                    this.wrongWord.push(word);
                }

                this.gameMenu();

                if (!this.wordHint.includes('_')) {
                    this.gameClear = true;
                    console.log(`축하합니다! 단어 [${this.randomWord}]를 맞추셨습니다!`);
                    process.stdin.setRawMode(false);
                    rl.close();
                    resolve();
                }
            });
        })
    }

    async startGame() {
        this.gameMenu();
        await this.startTimer;
        await this.pressWords();
    }
}

// const game = new GameStart();
// game.startGame();

module.exports = GameStart;