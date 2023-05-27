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
        let skip = false;
        let isFinal = false;

        appender(`Попытка ${count}: '${userGuess}'\n`);

        let response = ""
        if (userGuess === "q") {
            response = "Выход.\n";
            isFinal = true;
            skip = true;
        } else if (!userGuess.trim()) {
            response = "Вы ничего не ввели.\n";
            skip = true;
        }
        if (!skip) {
            userGuess = +userGuess
            if (isNaN(userGuess)) {
                response = "Вы ввели не число.\n";
                skip = true;
            } else if (userGuess === numberToGuess) {
                response = "Вы угадали число за ${count} попыток";
                isFinal = true;
            } else if (userGuess < numberToGuess) {
                response = "Загаданное число больше ${userGuess}$\n";
            } else if (userGuess > numberToGuess) {
                response = "Загаданное число меньше ${userGuess}$\n";
            }
        }
        rl.write(response);
        appender(`Ответ: ${response}`);
        if (isFinal) {
            rl.close();
            return
        }
        if (!skip) {
            count++;
        }
        question(count);
    })
};

question();