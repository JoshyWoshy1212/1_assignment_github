// wordGameApp.js
const readline = require('readline');

//////////////////////////////
// WordManager 클래스
//////////////////////////////
class WordManager {
  constructor() {
    this._words = ['TEST', 'HELLO', 'WORLD'];
  }

  // 단어 목록에 접근하는 getter
  get wordList() {
    return this._words;
  }

  // 단어 목록을 통째로 교체할 수 있는 setter (필요에 따라 사용)
  set wordList(newList) {
    if (Array.isArray(newList)) {
      this._words = newList.map(word => word.toUpperCase());
    }
  }

  // 단어 추가 (대문자로 저장)
  addWord(word) {
    if (word) {
      this._words.push(word.toUpperCase());
    }
  }

  // 인덱스를 이용하여 단어 삭제 (존재하지 않는 인덱스면 null 반환)
  removeWord(index) {
    if (index >= 0 && index < this._words.length) {
      return this._words.splice(index, 1);
    }
    return null;
  }

  // 단어 목록에서 무작위 단어 선택 (getter로 제공)
  get randomWord() {
    if (this._words.length === 0) return null;
    return this._words[Math.floor(Math.random() * this._words.length)].toUpperCase();
  }
}

//////////////////////////////
// GameEngine 클래스
//////////////////////////////
class GameEngine {
  constructor(word) {
    this._word = word;
    this._masked = Array(word.length).fill('_');
    this._guessedLetters = new Set();
    this._timeLimit = 10 * 1000; // 10초
    this._startTime = null;
    this._interval = null;
    this._gameOver = false;
  }

  // 원본 단어 getter
  get word() {
    return this._word;
  }

  // 현재 진행 중인 단어 상태 getter
  get currentMasked() {
    return this._masked.join(' ');
  }

  // 남은 시간(밀리초)을 반환하는 getter
  get remainingTime() {
    return Math.max(0, this._timeLimit - (Date.now() - this._startTime));
  }

  // 현재 게임의 승리 여부 getter
  get hasWon() {
    return this._masked.join('') === this._word;
  }

  // 화면 갱신: 남은 시간, 단어 진행상태, 입력한 글자 목록 출력
  updateScreen() {
    console.clear();
    console.log('=== 단어 찾기 게임 ===');
    console.log(`남은 시간: ${Math.ceil(this.remainingTime / 1000)}초`);
    console.log('단어: ' + this.currentMasked);
    console.log('입력한 글자: ' + (Array.from(this._guessedLetters).join(', ') || '없음'));
  }

  // 게임을 시작하며 Promise를 반환 (게임 종료 시 resolve)
  start() {
    return new Promise((resolve) => {
      this._startTime = Date.now();

      // raw 모드 활성화: 키 입력 시 바로 처리
      process.stdin.setRawMode(true);
      readline.emitKeypressEvents(process.stdin);

      const onData = (data) => {
        if (this._gameOver) return;
        const input = data.toString();
        // Ctrl+C 입력 시 프로그램 종료
        if (input === '\u0003') {
          process.exit();
        }
        const letter = input.toUpperCase();
        if (letter.length !== 1 || !/[A-Z]/.test(letter)) return;
        if (this._guessedLetters.has(letter)) return;
        this._guessedLetters.add(letter);

        // 단어 내에서 입력된 글자 표시
        for (let i = 0; i < this._word.length; i++) {
          if (this._word[i] === letter) {
            this._masked[i] = letter;
          }
        }
        if (this.hasWon) {
          this.endGame(true, onData, resolve);
        }
      };

      process.stdin.on('data', onData);

      // 200ms 간격으로 화면 갱신 및 시간 체크
      this._interval = setInterval(() => {
        this.updateScreen();
        if (Date.now() - this._startTime >= this._timeLimit) {
          this.endGame(false, onData, resolve);
        }
      }, 200);
    });
  }

  // 게임 종료 처리: 성공/실패 메시지 출력 후 Promise resolve
  endGame(won, onData, resolve) {
    if (this._gameOver) return;
    this._gameOver = true;
    clearInterval(this._interval);
    process.stdin.removeListener('data', onData);
    process.stdin.setRawMode(false);
    console.clear();
    if (won) {
      console.log(`축하합니다! 단어 [${this._word}]를 맞추셨습니다!`);
    } else {
      console.log(`시간이 초과되었습니다. 실패! 정답은 [${this._word}]였습니다.`);
    }
    setTimeout(() => {
      resolve(won);
    }, 1500);
  }
}

//////////////////////////////
// WordGameApp 클래스
//////////////////////////////
class WordGameApp {
  constructor() {
    this._wordManager = new WordManager();
    this._rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    });
  }

  // WordManager getter (필요 시 외부에서 접근 가능)
  get wordManager() {
    return this._wordManager;
  }

  // readline 인터페이스 getter
  get rl() {
    return this._rl;
  }

  // 프롬프트 입력 헬퍼 (Promise 기반)
  promptInput(query) {
    return new Promise((resolve) => {
      this._rl.question(query, (answer) => resolve(answer.trim()));
    });
  }

  // 메인 메뉴를 반복하여 출력
  async showMainMenu() {
    while (true) {
      console.clear();
      console.log('=== 단어 찾기 게임 ===');
      console.log('1. 게임 시작');
      console.log('2. 단어 설정');
      console.log('0. 게임 종료');
      const choice = await this.promptInput('메뉴 선택: ');

      if (choice === '1') {
        await this.startGame();
      } else if (choice === '2') {
        await this.wordSettingsMenu();
      } else if (choice === '0') {
        console.clear();
        console.log('게임을 종료합니다.');
        break;
      } else {
        console.log('오류: 유효하지 않은 선택입니다. (0, 1, 2 중 선택)');
        await this.promptInput('계속하려면 엔터키를 누르세요.');
      }
    }
    this._rl.close();
    process.exit(0);
  }

  // 단어 설정 메뉴 (목록 조회, 추가, 삭제)
  async wordSettingsMenu() {
    while (true) {
      console.clear();
      console.log('=== 단어 설정 메뉴 ===');
      console.log('1. 단어 목록 확인');
      console.log('2. 단어 추가');
      console.log('3. 단어 삭제');
      console.log('0. 메뉴로 돌아가기');
      const choice = await this.promptInput('메뉴 선택: ');
      if (choice === '1') {
        await this.viewWordList();
      } else if (choice === '2') {
        await this.addWord();
      } else if (choice === '3') {
        await this.deleteWord();
      } else if (choice === '0') {
        break;
      } else {
        console.log('오류: 유효하지 않은 선택입니다. (0, 1, 2, 3 중 선택)');
        await this.promptInput('계속하려면 엔터키를 누르세요.');
      }
    }
  }

  // 단어 목록 조회
  async viewWordList() {
    console.clear();
    console.log('=== 현재 단어 목록 ===');
    if (this._wordManager.wordList.length === 0) {
      console.log('단어 목록이 비어있습니다.');
    } else {
      this._wordManager.wordList.forEach((word, index) => {
        console.log(`${index + 1}. ${word}`);
      });
    }
    await this.promptInput('\n계속하려면 엔터키를 누르세요.');
  }

  // 단어 추가
  async addWord() {
    console.clear();
    const newWord = await this.promptInput('추가할 단어를 입력하세요: ');
    if (newWord) {
      this._wordManager.addWord(newWord);
      console.log(`단어 [${newWord.toUpperCase()}]가 추가되었습니다.`);
    }
    await this.promptInput('\n계속하려면 엔터키를 누르세요.');
  }

  // 단어 삭제
  async deleteWord() {
    console.clear();
    if (this._wordManager.wordList.length === 0) {
      console.log('삭제할 단어가 없습니다.');
      await this.promptInput('\n계속하려면 엔터키를 누르세요.');
      return;
    }
    console.log('=== 단어 삭제 ===');
    this._wordManager.wordList.forEach((word, index) => {
      console.log(`${index + 1}. ${word}`);
    });
    const indexStr = await this.promptInput('삭제할 단어 번호를 입력하세요: ');
    const index = parseInt(indexStr) - 1;
    if (!isNaN(index) && index >= 0 && index < this._wordManager.wordList.length) {
      const removed = this._wordManager.removeWord(index);
      console.log(`단어 [${removed}]가 삭제되었습니다.`);
    } else {
      console.log('오류: 해당 번호의 단어가 존재하지 않습니다.');
    }
    await this.promptInput('\n계속하려면 엔터키를 누르세요.');
  }

  // 게임 시작
  async startGame() {
    const randomWord = this._wordManager.randomWord;
    if (!randomWord) {
      console.clear();
      console.log('단어 목록이 비어있습니다. 단어 설정 메뉴에서 단어를 추가하세요.');
      await this.promptInput('\n계속하려면 엔터키를 누르세요.');
      return;
    }
    const gameEngine = new GameEngine(randomWord);
    await gameEngine.start();
  }
}

// 애플리케이션 실행
const app = new WordGameApp();
app.showMainMenu();
