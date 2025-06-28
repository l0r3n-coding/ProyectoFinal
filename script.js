// ESTILO Y DISEÑO DEL CONVERSOR DE UNIDADES
const style = document.createElement("style");
style.textContent = `
  body {
  background-color: rgb(243, 246, 247); /* COLOR DEL FONDO DE LA PÁGINA */
  font-family: Arial, sans-serif;       /* TIPO DE LETRA GENERAL */
  text-align: center;                   /* CENTRA TODO EL TEXTO */
  padding: 30px;                        /* ESPACIO INTERNO ALREDEDOR DEL CONTENIDO */
}

h1 {
  color: #d81b60;                       /* COLOR ROSA FUERTE DEL TÍTULO */
  font-size: 28px;                      /* TAMAÑO DEL TÍTULO PRINCIPAL */
  margin-bottom: 30px;                 /* ESPACIO ENTRE EL TÍTULO Y LAS TARJETAS */
}

.contenedor {
  display: grid;                        /* DISTRIBUCIÓN EN CUADRÍCULA (GRID) */
  grid-template-columns: repeat(2, 1fr); /* DOS COLUMNAS IGUALES */
  gap: 30px;                            /* ESPACIO ENTRE TARJETAS */
  justify-content: center;             /* CENTRA LAS TARJETAS EN HORIZONTAL */
  max-width: 800px;                    /* ANCHO MÁXIMO DEL CONTENEDOR */
  margin: 0 auto;                      /* CENTRADO AUTOMÁTICO HORIZONTAL */
}

.card {
  background: white;                   /* FONDO BLANCO DE CADA TARJETA */
  padding: 20px;                       /* ESPACIO INTERNO DE LA TARJETA */
  border-radius: 15px;                 /* ESQUINAS REDONDEADAS */
  box-shadow: 0 0 10px rgba(0,0,0,0.2); /* SOMBRA SUAVE */
  border: 2px solid black;             /* BORDE NEGRO ALREDEDOR DE CADA TARJETA */
}

.card h2 {
  font-size: 18px;                     /* TAMAÑO DEL TÍTULO DE CADA TARJETA */
  margin-bottom: 10px;                 /* ESPACIO ENTRE EL TÍTULO Y EL PRIMER CAMPO */
}

input, select, button {
  margin-top: 10px;                    /* ESPACIO ENTRE CADA ELEMENTO */
  width: 100%;                         /* OCUPA TODO EL ANCHO DISPONIBLE */
  padding: 10px;                       /* ESPACIO INTERNO DEL CAMPO */
  font-size: 14px;                     /* TAMAÑO DEL TEXTO DE ENTRADA Y BOTONES */
  border: 1px solid #ccc;              /* BORDE GRIS CLARO */
  border-radius: 5px;                  /* ESQUINAS REDONDEADAS */
  box-sizing: border-box;             /* INCLUYE EL BORDE Y PADDING EN EL ANCHO */
}

button {
  background-color: rgb(163, 233, 225); /* COLOR DE FONDO DEL BOTÓN */
  color: white;                        /* COLOR DEL TEXTO DEL BOTÓN */
  border: none;                        /* SIN BORDE EXTRA */
  font-weight: bold;                  /* TEXTO EN NEGRITAS */
  cursor: pointer;                    /* CAMBIA EL CURSOR AL PASAR SOBRE EL BOTÓN */
}

button:hover {
  background-color: #81e6d9;          /* COLOR DEL BOTÓN AL PASAR EL CURSOR ENCIMA */
}

p {
  margin-top: 10px;                   /* ESPACIO ENTRE EL BOTÓN Y EL RESULTADO */
  font-weight: bold;                  /* RESULTADO EN NEGRITAS */
}
`;
document.head.appendChild(style);

// UNIDADES CON NOMBRE VISIBLE Y CLAVE FUNCIONAL
const nombresVisibles = {
  longitud: {
    m: "Metros",
    km: "Kilómetros",
    cm: "Centímetros",
    mm: "Milímetros",
    ft: "Pies",
    in: "Pulgadas",
    mi: "Millas",
    yd: "Yardas"
  },
  volumen: {
    L: "Litros",
    mL: "Mililitros",
    "m³": "Metros cúbicos",
    "cm³": "Centímetros cúbicos"
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

// FACTORES DE CONVERSIÓN
const factores = {
  longitud: {
    m: 1, km: 0.001, cm: 100, mm: 1000,
    ft: 3.28084, in: 39.3701, mi: 0.000621371, yd: 1.09361
  },
  volumen: {
    L: 1, mL: 1000, "m³": 0.001, "cm³": 1000
  },
  peso: {
    kg: 1, g: 1000, mg: 1000000,
    lb: 2.20462, oz: 35.274, ton: 0.00110231
  }
};

// LLENAR LOS SELECTS CON VALORES FUNCIONALES Y TEXTOS VISIBLES
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

// FUNCIÓN PRINCIPAL
function convertir(categoria) {
  const valor = parseFloat(document.getElementById(`valor-${categoria}`).value);
  const entrada = document.getElementById(`unidadEntrada-${categoria}`).value;
  const salida = document.getElementById(`unidadSalida-${categoria}`).value;
  const resultadoElemento = document.getElementById(`resultado-${categoria}`);

  if (isNaN(valor)) {
    resultadoElemento.textContent = "Ingresa un número válido.";
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

// CONVERSIÓN GENERAL CON FACTORES
function convertirPorFactor(categoria, valor, entrada, salida) {
  const base = valor / factores[categoria][entrada];
  const convertido = base * factores[categoria][salida];
  return convertido.toFixed(4);
}

// CONVERSIÓN DE TEMPERATURA
function convertirTemperatura(valor, entrada, salida) {
  let tempC;
  switch (entrada) {
    case "C": tempC = valor; break;
    case "F": tempC = (valor - 32) * 5 / 9; break;
    case "K": tempC = valor - 273.15; break;
    default: return "Unidad no válida";
  }

  switch (salida) {
    case "C": return tempC.toFixed(2);
    case "F": return ((tempC * 9 / 5) + 32).toFixed(2);
    case "K": return (tempC + 273.15).toFixed(2);
    default: return "Unidad no válida";
  }
}

// EJECUTAR AL CARGAR
document.addEventListener("DOMContentLoaded", inicializarSelects);
