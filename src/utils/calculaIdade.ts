//https://pt.stackoverflow.com/questions/5160/como-calcular-a-idade-de-uma-pessoa-com-js-a-partir-da-data-de-nascimento#:~:text=objetos%20Date%0Afunction-,calculaIdade,-(nascimento%2C%20hoje
// calcula a idade considerando os parâmetros 
// 'nascimento' e 'hoje' como objetos Date
function calculaIdade(nascimento: string){
    return Math.floor(Math.ceil(Math.abs(Date.parse(nascimento) - Date.now()) / (1000 * 3600 * 24)) / 365.25);
}

export default calculaIdade;