document.addEventListener("DOMContentLoaded", function(){
    let API_EDAD_URL = "https://api.agify.io/?name=";
    let API_GENERO_URL = "https://api.genderize.io/?name=";

    let adivinarButton = document.getElementById("adivinarButton");
    let edadResultado = document.getElementById("edadResultado");
    let generoResultado = document.getElementById("generoResultado");
    let probabilidad = document.getElementById("probabilidad");
    let inputNombre = document.getElementById("inputNombre");
    let goBackButton = document.getElementById("goBackButton");
    let adivinadorDiv = document.getElementById("adivinadorDiv");
    let body = document.body;
    let resultado = document.getElementById("resultado");
    let nombreBox = document.getElementById("nombreBox");

    function mostrarResultados(nombreParametro){
        fetch(API_EDAD_URL + nombreParametro)
            .then(response => response.json())
            .then(data => {
                let respuestaEdad = data.age;
                if (respuestaEdad) {
                    edadResultado.textContent = respuestaEdad;
                } else {
                    edadResultado.textContent = "No se pudo determinar la edad.";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                edadResultado.textContent = "Error al obtener la edad.";
            });

        fetch(API_GENERO_URL + nombreParametro)
            .then(response => response.json())
            .then(data => {
                let probabilidadGenero = data.probability;
                if (probabilidadGenero) {
                    probabilidadGenero = (probabilidadGenero * 100).toFixed(2) + "%";
                    probabilidad.textContent = probabilidadGenero;
                } else {
                    probabilidad.textContent = "No se pudo determinar la probabilidad de género.";
                }

                let respuestaGenero = data.gender;
                if (respuestaGenero === "male") {
                    generoResultado.textContent = "hombre";
                } else if (respuestaGenero === "female") {
                    generoResultado.textContent = "mujer";
                } else {
                    generoResultado.textContent = "No se pudo determinar el género.";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                probabilidad.textContent = "Error al obtener el género.";
            });
    }

    adivinarButton.addEventListener("click", function(){
        adivinarButton.disabled = true;
        let nombre = inputNombre.value;
        if(nombre){
            goBackButton.style.display = "none";
            body.style.animation = "shake 3s";
            setTimeout(function() {
                adivinadorDiv.style.display = "none";
                body.style.animation = "";
                goBackButton.style.display = "block";
                nombreBox.textContent = nombre;
                inputNombre.value = "";
                adivinarButton.disabled = false;
                resultado.style.display = "block";
            }, 3000);
            mostrarResultados(nombre);
        } else {
            alert("No se introdujo un nombre");
        }
    })

    goBackButton.addEventListener("click", function(){
        adivinadorDiv.style.display = "block";
        resultado.style.display = "none";
        inputNombre.value = "";
        adivinarButton.disabled = false;
    })
});