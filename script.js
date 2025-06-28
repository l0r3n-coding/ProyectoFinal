// ESTILO Y DISEÑO DEL CONVERSOR DE UNIDADES
const style = document.createElement("style");
style.textContent = `
  body {
    background-color: rgb(243, 246, 247); /* COLOR FONDO */
    font-family: Arial, sans-serif;  /* TIPO LETRA */
    text-align: center;   /* CENTRA TEXTO */
    padding: 30px;  /* ESPACIO ALREDEDOR DEL CONTENIDO */
  }

  h1 {
    color: #d81b60;   /* COLOR DEL TITULO */
    font-size: 28px;    /* TAMAÑO DE LA LETRA DEL TITULO */
    margin-bottom: 30px; /* ESPACIO ENTRE EL TÍTULO Y LAS CARTAS */
  }

  .contenedor {
    display: grid;    /* DISTRIBUCION CARTAS */
    grid-template-columns: repeat(2, 1fr); /* DOS COLUMNAS DE CARTAS */
    gap: 30px;  /* ESPACIO ENTRE LAS CARTAS */
    justify-content: center;  /* CENTRAR LAS CARTAS EN HORIZONTAL */
    max-width: 800px;    /* ANCHO DEL CONTENEDOR QUE CONTIENE LAS CARTAS */
    margin: 0 auto;   /* CENTRADO */
  }

  .card {
    background: white; /* FONDO BLANCO DE CADA CARTA */
    padding: 20px;     /* ESPACIO INTERNO DE LA CARTA */
    border-radius: 15px;  /* ESQUINAS REDONDEADAS */
    box-shadow: 0 0 10px rgba(0,0,0,0.2); /* SOMBRA */
    border: 2px solid black;  /* BORDE NEGRO */
  }

  .card h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  input, select, button {
    margin-top: 10px;
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }

  button {
    background-color: rgb(163, 233, 225);
    color: white;
    border: none;
    font-weight: bold;
    cursor: pointer;
  }

  button:hover {
    background-color: #81e6d9;
  }

  p {
    margin-top: 10px;
    font-weight: bold;
  }
`;
document.head.appendChild(style);

// UNIDADES CON NOMBRE VISIBLE Y CLAVE FUNCIONAL
const nombresVisibles = {
  longitud: {
    m: "Metros",
    km: "Kilometros",
    cm: "Centimetros",
    mm: "Milimetros",
    ft: "Pies",
    in: "Pulgadas",
    mi: "Millas",
    yd: "Yardas"
  },
  volumen: {
    L: "Litros",
    mL: "Mililitros",
    "m^3": "Metros cubicos",
    "cm^3": "Centimetros cubicos"
  },
  peso: {
    kg: "Kilogramos",
    g: "Gramos",
    mg: "Miligramos",
    lb: "Libras",
    oz: "Onzas",
    ton: "Toneladas"
  },
  temperatura: {
    C: "Celsius",
    F: "Fahrenheit",
    K: "Kelvin"
  }
};

// CONVERSION
const factores = {
  longitud: {
    m: 1, km: 0.001, cm: 100, mm: 1000,
    ft: 3.28084, in: 39.3701, mi: 0.000621371, yd: 1.09361
  },
  volumen: {
    L: 1, mL: 1000, "m^3": 0.001, "cm^3": 1000
  },
  peso: {
    kg: 1, g: 1000, mg: 1000000,
    lb: 2.20462, oz: 35.274, ton: 0.00110231
  }
};

// SELECTS
function inicializarSelects() {
  for (let categoria in nombresVisibles) {
    const entrada = document.getElementById(`unidadEntrada-${categoria}`);
    const salida = document.getElementById(`unidadSalida-${categoria}`);
    
    entrada.innerHTML = "";
    salida.innerHTML = "";

    for (let clave in nombresVisibles[categoria]) {
      const nombre = nombresVisibles[categoria][clave];

      const opt1 = document.createElement("option");
      opt1.value = clave;
      opt1.textContent = nombre;
      entrada.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = clave;
      opt2.textContent = nombre;
      salida.appendChild(opt2);
    }
  }
}

// FUNCION PRINCIPAL
function convertir(categoria) {
  const valor = parseFloat(document.getElementById(`valor-${categoria}`).value);
  const entrada = document.getElementById(`unidadEntrada-${categoria}`).value;
  const salida = document.getElementById(`unidadSalida-${categoria}`).value;
  const resultadoElemento = document.getElementById(`resultado-${categoria}`);

  if (isNaN(valor)) {
    resultadoElemento.textContent = "Ingresa un numero valido.";
    return;
  }

  let resultado;
  if (categoria === "temperatura") {
    resultado = convertirTemperatura(valor, entrada, salida);
  } else {
    resultado = convertirPorFactor(categoria, valor, entrada, salida);
  }

  resultadoElemento.textContent = `Resultado: ${resultado}`;
}

// CONVERSI0N GENERAL CON FACTORES
function convertirPorFactor(categoria, valor, entrada, salida) {
  const base = valor / factores[categoria][entrada];
  const convertido = base * factores[categoria][salida];
  return convertido.toFixed(4);
}

// CONVERSI0N DE TEMPERATURA
function convertirTemperatura(valor, entrada, salida) {
  let tempC;
  switch (entrada) {
    case "C": tempC = valor; break;
    case "F": tempC = (valor - 32) * 5 / 9; break;
    case "K": tempC = valor - 273.15; break;
    default: return "Unidad NO valida";
  }

  switch (salida) {
    case "C": return tempC.toFixed(2);
    case "F": return ((tempC * 9 / 5) + 32).toFixed(2);
    case "K": return (tempC + 273.15).toFixed(2);
    default: return "Unidad NO valida";
  }
}

// DOM
document.addEventListener("DOMContentLoaded", inicializarSelects);
