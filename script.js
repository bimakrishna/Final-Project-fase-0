class Calculator {
    constructor(operandsebelumnya, operandsekarang) {
        this.previousOperandTextElement = operandsebelumnya
        this.currentOperandTextElement = operandsekarang
        this.clear()
    }

    clear() {
        this.nowOperand = ''
        this.lastOperand = ''
        this.operation = undefined
    }

    delete() {
        this.nowOperand = this.nowOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.nowOperand.includes('.')) return
        this.nowOperand = this.nowOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.nowOperand === '') return
        if (this.lastOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.lastOperand = this.nowOperand
        this.nowOperand = ''
    }

    compute() {
        let Komputasi
        const awal = parseFloat(this.lastOperand)
        const kedua = parseFloat(this.nowOperand)
        if (isNaN(awal) || isNaN(kedua)) return
        switch (this.operation) {
            case '+':
                Komputasi = awal + kedua
                break
            case '-':
                Komputasi = awal - kedua
                break
            case '*':
                Komputasi = awal * kedua
                break
            case '÷':
                Komputasi = awal / kedua
                break
            default:
                return
        }
        this.nowOperand = Komputasi
        this.operation = undefined
        this.lastOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const angkaBulat = parseFloat(stringNumber.split('.')[0])
        const angkaDecimal = stringNumber.split('.')[1]
        let Display
        if (isNaN(angkaBulat)) {
            Display = ''
        } else {
            Display = angkaBulat.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (angkaDecimal != null) {
            return `${Display}.${angkaDecimal}`
        } else {
            return Display
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.nowOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.lastOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}
const number = document.querySelectorAll('[data-number]')
const operasi = document.querySelectorAll('[data-operation]')
const equals = document.querySelector('[data-equals]')
const deleteB = document.querySelector('[data-delete]')
const AC = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

number.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operasi.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equals.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

AC.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteB.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})