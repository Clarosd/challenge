// scripts.js

// array para almacenar los nombres
let amigos = [];

// array de colores para los nombres (máximo 6)
const nameColors = ["#ff69b4", "#1e90ff", "#32cd32", "#ffa500", "#9400d3", "#ff1493"];

// referencias a los elementos del DOM
const inputField = document.querySelector('.input-section input');
const addButton = document.querySelector('.add-btn');
const carousel = document.querySelector('.carousel');
const resetIcon = document.querySelector('.reset-icon'); 
const discoverBtn = document.querySelector('.discover-btn');

/**
 * es una función para crear una nueva card con el nombre.
 * @param {string} name - El nombre que se mostrará en la tarjeta.
 */
function createCard(name) {
  const card = document.createElement('div');
  card.classList.add('card');
  
  // Crear un elemento 'span' para el texto del nombre
  const cardText = document.createElement('span');
  cardText.classList.add('card-name'); // Clase específica para el estilo
  cardText.textContent = name;
  
  // Asignar un color único según el orden de ingreso
  cardText.style.color = nameColors[amigos.length - 1];
  
  // Agregar el span a la card
  card.appendChild(cardText);
  
  // Agregar la card al carrusel
  carousel.appendChild(card);
}

/**
 * Función que gestiona la adición de un nombre y la creación de la card.
 */
function addName() {
  const name = inputField.value.trim();

  // Verificar que no esté vacío
  if (name === "") {
    showAlert("Por favor, ingresa un nombre.");
    return;
  }
  // Verificar que no contenga números
  if (/\d/.test(name)) {
    showAlert("No se permiten números en el nombre.");
    return;
  }
  // Verificar que no se exceda el máximo de 6
  if (amigos.length >= 6) {
    showAlert("Se ha alcanzado el máximo de 6 nombres.");
    return;
  }
  // Agregar el nombre y crear la tarjeta
  amigos.push(name);
  createCard(name);
  inputField.value = "";
}

// Eventos para añadir nombres
addButton.addEventListener('click', addName);
inputField.addEventListener('keydown', (event) => {
  if (event.key === "Enter") addName();
});

// Evento para reiniciar (limpia array y carrusel)
resetIcon.addEventListener('click', () => {
  amigos = [];
  carousel.innerHTML = "";
  delete carousel.dataset.duplicated; // No se necesita duplicar, se reinicia la lógica
  showAlert("Se han reiniciado los nombres.");
});

/**
 * Función que simula una ruleta entre las cards.
 * Resalta cada card secuencialmente con un intervalo que aumenta (simulando desaceleración)
 * hasta detenerse en una card elegida al azar.
 * No se generan duplicados; la selección se reinicia cada vez.
 */
function spinRoulette(totalDuration = 3000, initialDelay = 100, delayIncrement = 30) {
  const cards = carousel.querySelectorAll('.card');
  if (cards.length === 0) {
    showAlert("No hay amigos para descubrir.");
    return;
  }
  
  // Remover cualquier clase de selección y mensaje previo
  cards.forEach(card => {
    card.classList.remove('highlight', 'selected-card');
    const existingMsg = card.querySelector('.secret-message');
    if (existingMsg) existingMsg.remove();
  });
  
  // Elegir al azar la card objetivo
  const targetIndex = Math.floor(Math.random() * cards.length);
  
  let currentIndex = 0;
  let currentDelay = initialDelay;
  let elapsedTime = 0;
  
  function spinStep() {
    // Quitar highlight de todas y resaltar la card actual
    cards.forEach(card => card.classList.remove('highlight'));
    cards[currentIndex].classList.add('highlight');
    
    elapsedTime += currentDelay;
    
    if (elapsedTime < totalDuration) {
      currentDelay += delayIncrement; // Aumenta el retardo (desaceleración)
      currentIndex = (currentIndex + 1) % cards.length;
      setTimeout(spinStep, currentDelay);
    } else {
      // Fin del spin: se fuerza que la card final sea la elegida al azar
      cards.forEach(card => card.classList.remove('highlight'));
      const chosenCard = cards[targetIndex];
      chosenCard.classList.add('selected-card');
      
      // Agregar el mensaje "Tu amigo secreto es ..."
      const existingMsg = chosenCard.querySelector('.secret-message');
      if (existingMsg) existingMsg.remove();
      const secretMessage = document.createElement('div');
      secretMessage.classList.add('secret-message');
      const name = chosenCard.querySelector('.card-name').textContent;
      secretMessage.textContent = "Tu amigo secreto es " + name;
      chosenCard.appendChild(secretMessage);
    }
  }
  
  spinStep();
}

// Evento único para el botón "Descubrir Amig@"
discoverBtn.addEventListener('click', () => {
  spinRoulette();
});

/**
 * Muestra un modal de alerta personalizado.
 * @param {string} message - El mensaje a mostrar.
 */
function showAlert(message) {
  const alertModal = document.getElementById('customAlert');
  const alertMessage = document.getElementById('customAlertMessage');
  const alertButton = document.getElementById('customAlertButton');
  
  alertMessage.textContent = message;
  alertModal.classList.remove('hidden');
  
  function hideAlert() {
    alertModal.classList.add('hidden');
    alertButton.removeEventListener('click', hideAlert);
  }
  alertButton.addEventListener('click', hideAlert);
}
