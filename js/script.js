let numero1 = "";
let numero2 = "";
let operador = false;
let resultado;

const numeros = document.querySelectorAll(".numeros");
const operadores = document.querySelectorAll(".operador");
const resultadoContainer = document.getElementById('resultado');
const numeroAtual = resultadoContainer.querySelector("p");
const negativo = document.querySelector(".negativo");
const porcentagem = document.querySelector(".porcentagem");


// funções

const limpar = () => {
  numero1 = "";
  numero2 = "";
  operador = false;
  resultado = false;
  resultadoContainer.querySelector("p").innerText = 0;

  const operadorSelecionado = document.querySelector(".selecionado") || false;
  if (operadorSelecionado) {
    operadorSelecionado.classList.remove("selecionado");
  }
}

const converterParaNumero = () => {
  if(numero1 !== '') {
    numero1 = +numero1;
  } else { 
    return;
  }
  
  if (numero2 !== '') {
    numero2 = +numero2;
  } else { 
    return;
  }
}

const formatacao = () => {
  let valor = numeroAtual.innerText;

  if(valor.length >= 8) {
    valor = Number(valor).toFixed(5);
    numeroAtual.innerText = valor.toString().replace(",", ".");
  }
}

const operação = () => {

  if(numero1 !== "" && numero2 !== "" && operador) {
    converterParaNumero();
    switch(operador) {
      case "+":
        resultadoContainer.querySelector("p").innerText = "";
        resultado = numero1 + numero2;
        break;
      case "-":
        resultadoContainer.querySelector("p").innerText = "";
        resultado = numero1 - numero2;
        break;
      case "÷":
        resultadoContainer.querySelector("p").innerText = "";
        resultado = numero1 / numero2;
        break;
      case "x":
        resultadoContainer.querySelector("p").innerText = "";
        resultado = numero1 * numero2
        break;
    }

    setTimeout(() => {
      resultadoContainer.querySelector("p").innerText = resultado.toString().replace(".", ",");
    }, 200);

    numero1 = resultado;
    numero2 = "";

  } else {
    resultadoContainer.querySelector("p").innerText = "Erro";
    numero1 = "";
    numero2 = "";
    resultado = false;
    operador = false;
  }
   console.log("O resultado é:" + resultado);
}

// eventos

numeros.forEach((numero) => {
    numero.addEventListener("click", () => {

        if(operador && numero1.length !== 0) {
          numero2 += numero.value;
          resultadoContainer.querySelector("p").innerText = numero2.replace(".", ",");
          

          const operadorSelecionado = document.querySelector(".selecionado") || false;
          if (operadorSelecionado) {
            operadorSelecionado.classList.remove("selecionado");
          }

          console.log("O número 2 é:"+ numero2);

        } else {

          numero1 += numero.value;
          resultadoContainer.querySelector("p").innerText = numero1.replace(".", ",");
          console.log("O número 1 é:"+ numero1);
          
        }        
    })
})

operadores.forEach((o) => {
    o.addEventListener("click", () => {
      const operadorSelecionado = document.querySelector(".selecionado") || false;
      if(operadorSelecionado) {
        operadorSelecionado.classList.remove("selecionado");
      }
      
      o.classList.add("selecionado");
      operador = o.innerText;
      console.log("Operador é:" + operador);

      if(numero1 === "") {
        numero1 = 0;
      }
    })
});

document.querySelector(".finalizar").addEventListener("click", operação);
document.querySelector('.apagar').addEventListener("click", limpar);

negativo.addEventListener("click", () => {
  
  if(numeroAtual.innerText == numero1 || numeroAtual.innerText.replace(",", ".") == numero1) {
    numero1 = -numero1;
    console.log(numero1);
    numeroAtual.innerText = numero1.toString().replace(".", ",");

  } else if (numeroAtual.innerText == numero2 || numeroAtual.innerText.replace(",", ".") == numero2) {
    numero2 = -numero2;
    numeroAtual.innerText = numero2.toString().replace(".", ",");

  } else {
    return;
  }
});


porcentagem.addEventListener("click", () => {
  let numeroFormatado;
  if(numeroAtual.innerText == numero1 || numeroAtual.innerText.replace(",", ".") == numero1) {
    numero1 = numero1 / 100;
    numeroFormatado = numero1.toString().replace(".", ",");
    numeroAtual.innerText = numeroFormatado;
    console.log("O número 1 é:"+numero1)
  } else if (numeroAtual.innerText == numero2) {
    numero2 = numero2 / 100;
    numeroFormatado = numero2.toString().replace(".", ",");
    numeroAtual.innerText = numeroFormatado;
    console.log("O número 1 é:"+numero2)
  } else {
    return;
  }  
})

formatacao();