const num1 = document.querySelector('#num1');
const num2 = document.querySelector('#num2');
const num3 = document.querySelector('#num3');
const num4 = document.querySelector('#num4');
const sendAnswer = document.querySelector('#start');
const main = document.querySelector('#main');

const Calculator = (function () {
    let numArray = [];
    sendAnswer.addEventListener('click', function(event) {
        numArray = [num1.value,num2.value,num3.value,num4.value];
        main.textContent = "";
        calculate();
    })

    let numbersMissing = [1,2,3,4,5,6,7,8,9,10];
    
    let answers = [];
    let operations = ["+","-","*","/"];

    const removeOnlyOneNumber = (array,number) => {
        let numberString = array.toString();
        numberString = numberString.replace(`${number}`,"");
        numberString = numberString.replace(`,,`,",");
        if (numberString.slice(-1) == ",") {
            numberString = numberString.slice(0, -1);
        }
        if (numberString.slice(0,1) == ",") {
            numberString = numberString.slice(1);
        }
        let finalArray = numberString.split(",");
        return finalArray
    }

    const testResult = (result,fullFunction) => {
        for (let i = 0; i < numbersMissing.length; i++) {
            if (numbersMissing[i] == result) {
                numbersMissing = numbersMissing.filter(value => value != result);
                answers[result-1] = `${result} = ${fullFunction}`;
            }
        }
    }

    const calculate = () => {
        loop1:
            for (let i = 0; i < 4; i++) {
                let firstNumber = numArray[i];
                let lastTreeNumbers = removeOnlyOneNumber(numArray, firstNumber);
                for (let j = 0; j < 3; j++) {
                    let secondNumber = lastTreeNumbers[j];
                    let lastTwoNumbers = removeOnlyOneNumber(lastTreeNumbers, secondNumber);
                    for (let k = 0; k < 2; k++) {
                        let thirdNumber = lastTwoNumbers[k];
                        let lastNumber = removeOnlyOneNumber(lastTwoNumbers, thirdNumber);
                        let fourthNumber = lastNumber[0];
                        for (let a = 0; a < 4; a++) {
                            for (let b = 0; b < 4; b++) {
                                for (let c = 0; c < 4; c++) {
                                    let fullfunction = firstNumber + operations[a] + secondNumber + operations[b] + thirdNumber + operations[c] + fourthNumber
                                    let result = eval(fullfunction);
                                    testResult(result,fullfunction);

                                    fullfunction = "(" + firstNumber + operations[a] + secondNumber + ")" + operations[b] + thirdNumber + operations[c] + fourthNumber
                                    result = eval(fullfunction);
                                    testResult(result,fullfunction);

                                    fullfunction = firstNumber + operations[a] + "(" + secondNumber+ operations[b] + thirdNumber  + ")" + operations[c] + fourthNumber
                                    result = eval(fullfunction);
                                    testResult(result,fullfunction);

                                    fullfunction = firstNumber + operations[a] + secondNumber+ operations[b] + "(" + thirdNumber + operations[c] + fourthNumber + ")" 
                                    result = eval(fullfunction);
                                    testResult(result,fullfunction);

                                    fullfunction = "(" + firstNumber + operations[a] + secondNumber + ")" + operations[b] + "(" + thirdNumber + operations[c] + fourthNumber + ")" 
                                    result = eval(fullfunction);
                                    testResult(result,fullfunction);

                                    fullfunction = "(" + firstNumber + operations[a] + secondNumber + operations[b] + thirdNumber + ")" + operations[c] + fourthNumber
                                    result = eval(fullfunction);
                                    testResult(result,fullfunction);

                                    fullfunction = firstNumber + operations[a] + "(" + secondNumber + operations[b] + thirdNumber + operations[c] + fourthNumber + ")"
                                    result = eval(fullfunction);
                                    testResult(result,fullfunction);
                                    
                                    fullfunction = "(" + "(" + firstNumber + operations[a] + secondNumber + ")" + operations[b] + thirdNumber + ")" + operations[c] + fourthNumber
                                    result = eval(fullfunction);
                                    testResult(result,fullfunction);

                                    fullfunction = "(" + firstNumber + operations[a] + "(" + secondNumber + operations[b] + thirdNumber + ")" + ")" + operations[c] + fourthNumber
                                    result = eval(fullfunction);
                                    testResult(result,fullfunction);

                                    fullfunction = firstNumber + operations[a] + "(" + "(" + secondNumber + operations[b] + thirdNumber + ")" + operations[c] + fourthNumber + ")"
                                    result = eval(fullfunction);
                                    testResult(result,fullfunction);

                                    fullfunction = firstNumber + operations[a] + "(" + secondNumber + operations[b] + "(" + thirdNumber + operations[c] + fourthNumber + ")" + ")"
                                    result = eval(fullfunction);
                                    testResult(result,fullfunction);

                                    if (numbersMissing.length == 0) {
                                        break loop1;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        
        const answersDiv = document.createElement('div');
        for (let i=0; i < 10; i++) {
            const answerFunction = document.createElement('div');
            answerFunction.textContent = answers[i];
            answersDiv.appendChild(answerFunction);
        }
        main.appendChild(answersDiv);
    }
})();