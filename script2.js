const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

const fs = require('node:fs/promises');

const numberToGuess = Math.round(Math.random() * 1000);

fs.writeFile("log.txt", `Загадано число ${numberToGuess}\n\n`)
const appender = fileAppender("log.txt")

function fileAppender(name) {
    return (text) => {
        fs.appendFile(name, text);
    }
}

function question(count = 1) {
    rl.question(`Попытка номер ${count} (q - выход)\n`, (userGuess) => {
        const userGuessNumber = +userGuess;

        let isFinal = false;

        appender(`Попытка ${count}: '${userGuess}'\n`);

        let response = ""
        if (userGuess === "q") {
            response = "Выход.\n";
            isFinal = true;
        } else if (!userGuess.trim()) {
            response = "Вы ничего не ввели.\n";
        } else if (isNaN(userGuessNumber)) {
            response = "Вы ввели не число.\n";
        } else if (userGuessNumber === numberToGuess) {
            response = `Вы угадали число с ${count}-го раза.`;
            isFinal = true;
        } else if (userGuessNumber < numberToGuess) {
            response = `Загаданное число больше ${userGuessNumber}\n`;
        } else if (userGuessNumber > numberToGuess) {
            response = `Загаданное число меньше ${userGuessNumber}\n`;
        }

        rl.write(response);
        appender(`Ответ: ${response}`);

        if (isFinal) {
            rl.close();
            return
        }

        count++;
        
        question(count);
    })
};

question();