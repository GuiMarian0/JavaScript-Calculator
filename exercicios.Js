// 1 - Crie uma função que retorna a string "Olá, " concatenada com um argumento text (a ser passado para a função) 
//      e com ponto de exclamação "!" no final.

function cumprimentar(nome) {
    const saudacao = "Olá";
    return [saudacao, nome].join(', ').concat("!")
}

console.log(cumprimentar("Guilherme"))

//metodo 2

function cumprimentar2(nome) {
    return `Olá, ${nome}!`
}

console.log(cumprimentar2("Rafaela"))

// 2 - Escreva uma função que receba a idade de uma pessoa em anos e retorne a mesma idade em dais.

function converterIdadeEmAnosParaDias(idade) {
    return idade * 365
}

console.log(converterIdadeEmAnosParaDias(10))

// 3 - Desenvolva uma função que recebe dois parâmetros, um é a quantidade de horas trabalhadas por um funcionário num mês, e o quanto ele recebe por hora. 
//     O retorno da função deve ser a string "Salário igual a R$ X", em que X é o quanto o funcionário ganhou no mês.

function calcularSalario(horasTrabalhadas, salarioHora) {
    let salarioMensal = horasTrabalhadas * salarioHora
    return `Salário igual a R$ ${salarioMensal}.`
}

console.log(calcularSalario(220, 10))

// 4 - Desenvolva uma função que recebe dois parâmetros, um é a quantidade de horas trabalhadas por um funcionário num mês, e o quanto ele recebe por hora.
//     A função deverá calcular o salário líquido mensal do funcionário, que é a quantidade de horas trabalhadas no mês multiplicada pelo valor da sua hora.
//     Desse valor, deve ser sbtraído 30%, relativo a impostos.

function calcularSalario2(horasTrabalhadas, salarioHora) {
    let salarioBruto = horasTrabalhadas * salarioHora
    let salarioLiquido = salarioBruto - salarioBruto * 30 / 100
    return `Salário líquido igual a R$ ${salarioLiquido}.`
}

console.log(calcularSalario2(220, 10))

// 5 - Crie uma funcão que recebe um número (de 1 a 12) e retorne o mês correspondente como uma string.
//     Por exemplo, se a entrada for 2, a função deverá retornar "fevereiro", pois este é o 2 mês.

function nomeDoMes(mes) {
    switch (mes) {
        case 1:
            return "janeiro";
        case 2:
            return "fevereiro";
        case 3:
            return "março";
        case 4:
            return "abril";
        case 5:
            return "maio"
        case 6:
            return "junho"
        case 7:
            return "julho"
        case 8:
            return "agosto"
        case 9:
            return "setembro"
        case 10:
            return "outubro"
        case 11:
            return "novembro"
        case 12:
            return "dezembro"
    }
}

console.log(nomeDoMes(1))

// Resolução 2:

function receberNomeDoMes(numero) {
    const mapeamento = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
    return mapeamento[--numero];
}

console.log(receberNomeDoMes(2));

// 6 - Crie uma função que recebe dois números e retorne se o primeiro é maior ou igual ao segundo.

function maiorOuIgual(num1, num2) {
    if (typeof num1 != typeof num2) return false

    return num1 >= num2
}

console.log(maiorOuIgual(5, 10))

// 7 - Escreva uma função que receba um valor booleano ou numérico. Se o parâmetro fornecido for booleano, o retorno da função deverá ser o inverso. 
//     Por exemplo, se a entrada for false, retornará true. Se o parâmetro for numérico, o retorno será o número inverso. Por exemplo, se for fornecido 1, o retorno será -1. 
//     Se o parâmetro de entrada não for de nenhum dos tipo acima, retorne "booleano ou número esperados, mas o parâmetro é do tipo ...".

function inverso(value) {
    const type = typeof value

    if (type == "boolean") return !value
    else if (type == "number") return -value
    else
        return `booleano ou número esperados, mas o parâmetro é do tipo ${type}`
}

console.log(inverso(false))

// 8 - Crie uma função que receba quatro números como parâmetro (numero, minimo, maximo, inclusivo) e retorne se o
//     parâmetro numero (o primeiro) está entre minimo e maximo. Quando o parâmetro inclusivo for true, tenha "entre"
//     como inlusivo, ou seja, considerando se numero é igual a minimo ou a maximo. Caso o parâmetro inclusivo não
//     seja informado, seu valor padrão deverá ser false, portanto, a lógica será exclusiva, não considerando se numero é igual a minimo ou a maximo


// 9 - Desenvolva uma função que recebe dois números inteiros não negativos (maiores ou iguais a zero) e realize a
//     multiplicação deles. Porém, não utilize o operador de mutiplicação.

function maioresOuIguaisAZero(num1, num2) {
    let resultado = 0
    for (let i = 0; index < num2; i++) {
        resultado += num1
    }
    return resultado
}

console.log(maioresOuIguaisAZero(5, 5))