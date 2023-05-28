function getPasswordChecker(password) {
    return userInput => userInput === password;
}

const check_aB1 = getPasswordChecker("aB1");
console.log(check_aB1("aB1"))
console.log(check_aB1("Ab1"))
console.log(check_aB1("145"))

const check_145 = getPasswordChecker("145");
console.log(check_145("abc"))
console.log(check_145("145"))
console.log(check_145(145))