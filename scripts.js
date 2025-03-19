// scripts.js

// Array para almacenar los nombres
let amigos = [];

// Referencias a los elementos del DOM
const inputField = document.querySelector('.input-section input');
// Asumiendo que el botón "Añadir" tiene una clase específica (por ejemplo, .add-btn)
const addButton = document.querySelector('.add-btn');
const carousel = document.querySelector('.carousel');
const resetIcon = document.querySelector('.reset-icon'); // Ícono de reinicio

/**
 * Función para crear una nueva card con el nombre.
 * @param {string} name - El nombre que se mostrará en la tarjeta.
 */
function createCard(name) {
  const card = document.createElement('div');
  card.classList.add('card');
  
  // Crear un elemento 'span' para el texto del nombre
  const cardText = document.createElement('span');
  cardText.classList.add('card-name');  // Clase específica para el estilo
  cardText.textContent = name;
  
  // Agregar el span a la card
  card.appendChild(cardText);
  
  // Agregar la card al carrusel
  carousel.appendChild(card);
}

/**
 * Función que gestiona la adición de un nombre al array y la creación de la card.
 */
function addName() {
  const name = inputField.value.trim();

  // 1. Verificar que no esté vacío
  if (name === "") {
    alert("Por favor, ingresa un nombre.");
    return;
  }

  // 2. Verificar que no contenga números
  if (/\d/.test(name)) {
    alert("No se permiten números en el nombre.");
    return;
  }

  // 3. Verificar que no se exceda el máximo de 6
  if (amigos.length >= 6) {
    alert("Se ha alcanzado el máximo de 6 nombres.");
    return;
  }

  // 4. Si todo está bien, agregar al array y crear la tarjeta
  amigos.push(name);
  createCard(name);
  inputField.value = ""; // Limpiar el campo de entrada
}

// Evento para el botón "Añadir"
addButton.addEventListener('click', addName);

// Permitir añadir también al presionar Enter en el input
inputField.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    addName();
  }
});

// Evento para el ícono de reinicio
resetIcon.addEventListener('click', () => {
  // Limpia el array
  amigos = [];
  
  // Elimina todas las tarjetas del carrusel
  carousel.innerHTML = "";
  
  alert("Se han reiniciado los nombres.");
});
