const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const { resolve } = require('node:path');

const rl = readline.createInterface({ input, output });

const numberToGuess = Math.round(Math.random() * 1000);

const readlinePromise = function (text) {
    return new Promise((resolve, reject) => {
        rl.question(text, (data) => {
            resolve(data);
        })
    })
}

async function question() {
    let count = 1;
    while (true) {
        const text = `Попытка номер ${count} (q - выход)\n`;
        const userGuess = await readlinePromise(text);
        const userGuessNumber = +userGuess

        let isFinal = false
        let response = ""

        if (userGuess === "q") {
            response = "Выход.\n";
            isFinal = true;
        } else if (!userGuess.trim()) {
            response = "Вы ничего не ввели.\n";
        } else if (isNaN(userGuessNumber)) {
            response = "Вы ввели не число.\n";
        } else if (userGuessNumber === numberToGuess) {
            response = `Вы угадали число c ${count}-го раза`;
            isFinal = true;
        } else if (userGuessNumber < numberToGuess) {
            response = `Загаданное число больше ${userGuessNumber}\n`;
        } else if (userGuessNumber > numberToGuess) {
            response = `Загаданное число меньше ${userGuessNumber}\n`;
        }
        rl.write(response);
        if (isFinal) {
            rl.close();
            break;
        }
        count++;
    }

};

question();