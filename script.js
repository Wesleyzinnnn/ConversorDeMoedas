const selectedValue = document.getElementById("selected-moeda");
const selectedValue2 = document.getElementById("selected-moeda2");
const btnConverter = document.getElementById("button-converter");
const resultado = document.getElementById("resultado");
const apikey = "cd9c9841158018895c9dc6c5";

function callApi(moedaSeleciona, moedaSeleciona2) {
    let numeroMoeda = document.getElementById("Input-numero");
    let valorInput = numeroMoeda.value;
    const url = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${moedaSeleciona}`;
    const url2 = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${moedaSeleciona2}`;
    if(valorInput === ""){
        alert("Digite um valor valido")
    }else{
        fetch(url)
    
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            resultado.innerHTML = `${valorInput} ${moedaSeleciona} = ${data.conversion_rates[moedaSeleciona2] * valorInput} ${moedaSeleciona2}`;
        })
        .catch(error => {
            console.error(error);
            alert("Escolha ambas as moedas antes de prosseguir com a conversao")
        });

    fetch(url2)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            resultado.innerHTML += `<br>${valorInput} ${moedaSeleciona2} = ${data.conversion_rates[moedaSeleciona] * valorInput} ${moedaSeleciona}`;
        })
        .catch(error => {
            console.error(error);
        });
    }

    
        resultado.innerHTML = " "
}

selectedValue.addEventListener("change", () => {
    const valorSelected = selectedValue.value.split(",")[0].trim();
    const valorSelected2 = selectedValue2.value.split(",")[0].trim();

});

selectedValue2.addEventListener("change", () => {
    const valorSelected = selectedValue.value.split(",")[0].trim();
    const valorSelected2 = selectedValue2.value.split(",")[0].trim();
    
});

btnConverter.addEventListener("click", () => {
    const valorSelected = selectedValue.value.split(",")[0].trim();
    const valorSelected2 = selectedValue2.value.split(",")[0].trim();
    if (!valorSelected || !valorSelected2) {
        alert("Por favor, escolha ambas as moedas antes de converter");
    } else {
        callApi(valorSelected, valorSelected2);
    }
});
