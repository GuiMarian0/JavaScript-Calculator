//Classe sempre começa com letra maiuscula (Conjunto de atributos e métodos)
class CalcController {
    //Classes é um conjunto de variaveis(Atributos) e funções(Métodos)
    //Objeto representa a classe

    constructor() {

        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = '';

        //this._ = chamada privada do elemento
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");//El quer dizer que se refere ao elemento do HTML
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();
    }

    //dir(); vê o HTML como JS no console
    //window; vê tudo que tem relação com o navegador no console. É a janela do usuário
    //document; é o documento. a página
    //innerHTML = Insere informação no formato HTML 

    initialize() {
        this.setDisplayDateTime()
        //Função executada por arrow function em tempo definido
        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000); //Espaço de tempo em milisegundos

        this.setLastNumberToDisplay();

        document.querySelectorAll('.btn-ac').forEach(btn => {

            btn.addEventListener('dblclick', e => {

                this.toggleAudio();
            });
        });
    }

    toggleAudio() {

        this._audioOnOff = !(this._audioOnOff)
    }

    playAudio() {

        if (this._audioOnOff) {

            this._audio.currentTime = 0;
            this._audio.play();

        }
    }


    initKeyboard() {

        document.addEventListener('keyup', e => {

            this.playAudio();

            switch (e.key) {
                case ' ':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '+':
                case '-':
                case '%':
                case '*':
                case '/':
                    this.addOperation(e.key);
                    break;
                case 'Enter':
                case '=':
                    this.calc()
                    break;
                case '.':
                case ',':
                    this.addDot();
                    break;

                case '0':
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    this.addOperation(parseInt(e.key)); //utiliza o método "parseInt" para converter a string para int
                    break;
            };

        });

    }

    //Evento que divide os eventos nos BTN em elemento, evento e função
    addEventListenerAll(element, events, fn) {
        //Split converte string em arrays
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);  //Pega o elemento btn, adiciona o evento da string click ou drag
        });
    }

    //Metodo limpar tudo
    clearAll() {
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();
    }

    //Metodo limpar tudo
    clearEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    //Método para filtrar o que foi adicionado por útimo no array
    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value) {
        // retorne o que aconteceu no array
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1) // "indexOff" busca se o valor está contido no array. A condição é um método que verifica se o value corresponde ao valor inserido, e caso seja true, retornará o index do elemento. Senão, retornará "-1"
    }

    pushOperation(value) {
        this._operation.push(value)

        if (this._operation.length > 3) {
            this.calc();

        }
    }

    getResult() {



        return eval(this._operation.join(""));
    }

    calc() {

        let last = '';

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }

        if (this._operation.length > 3) {
            last = this._operation.pop();

            this._lastNumber = this.getResult();

        } else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();

        if (last == '%') {

            result /= 100;
            this._operation = [result];

        } else {

            this._operation = [result];

            if (last) this._operation.push(last)
        }

        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true) {

        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;

            }
        }

        if (!lastItem) {

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }

        return lastItem;
    }


    // Função para incluir o último número inserido da operação this._operation para o displayCalc.
    setLastNumberToDisplay() {
        // Criamos um loop de for, para iterar pelos elementos de this._operation, a partir do último elemento, e verificamos se cada elemento
        // é um operador ou número, usando a função isOperator. Quando encontramos o primeiro elemento que não é um operador (!), ele é atribuído
        // para a variável lastNumber, e o laço se encerra com o break.

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;
    }

    // Metodo adicionar operador
    addOperation(value) {
        //"isNaN" é um método presente dentro de "window" que verifica se o valor inserido não é um numero. Se retornar false, é um numero.

        // A expressão retorna: Se "this" de value for um número, retornará false, caso contrário, true.
        if (isNaN(this.getLastOperation())) { //Neste caso, é uma string (true).

            if (this.isOperator(value)) {
                // identifica se o ultimo valor inserido é um operador. Caso seja verdadeiro, e se o usuário inserir outro operador, substitui.
                this.setLastOperation(value);

            } else {
                this.pushOperation(value)

                this.setLastNumberToDisplay();

            }

        } else { //Neste caso, é um numero (false)

            if (this.isOperator(value)) {

                this.pushOperation(value)

            } else {
                // captura o último valor inserido em "value", converte em string. Aguarda o próximo valor inserido, que também será convertido em string, e concatena.
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation((newValue));

                this.setLastNumberToDisplay();
            }
        }

    }

    //Metodo de erro
    setError() {
        this.displayCalc = "Error";
    }

    addDot() {

        let lastOperation = this.getLastOperation();

        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.')

        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();

    }

    //Metodo executar comandos
    execBtn(value) {

        this.playAudio();

        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'igual':
                this.calc()
                break;
            case 'ponto':
                this.addDot('.');
                break;

            case '0':
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(value)); //utiliza o método "parseInt" para converter a string para int
                break;
            default:
                this.setError();
                break;
        };
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        //querySeelctorAll busca todos os elementos do parâmetro
        //coloca o "querySelectorAll" em uma variável para capturar todos os elementos

        buttons.forEach((btn, index) => {
            //O método forEach() executará uma função para cada elemento presente em um array.
            //Adiciona a função

            this.addEventListenerAll(btn, "click drag", e => {
                //addEventListener recebe dois parametros -> Qual evento e o que deve fazer

                let textBtn = btn.className.baseVal.replace("btn-", "");//replace substitui o texto que quer no exemplo btn- por vazio
                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer"
                //Define um pointer como cursor para o mouse
            });
        });
    }

    //Método para data e hora
    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    //GET E SET: Atribuir e recuperar dados fora da classe
    get displayTime() {
        return this._timeEl.innerHTML
    }

    set displayTime(value) {
        return this._timeEl.innerHTML = value
    }

    get displayDate() {
        return this._dateEl.innerHTML
    }

    set displayDate(value) {
        return this._dateEl.innerHTML = value
    }

    get displayCalc() {

        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {


        if (value.length > 10) {
            this.setError();
            return false;
        }

        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value
    }
}

