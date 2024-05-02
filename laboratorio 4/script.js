// script.js

document.getElementById('fibonacciForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe
  
    const number = parseInt(document.getElementById('numberInput').value);
    if (isNaN(number) || number <= 0) {
      alert('Por favor, ingrese un número entero positivo.');
      return;
    }
  
    generateFibonacciCards(number);
  });
  
  document.getElementById('fibonacciCardsContainer').addEventListener('click', function(event) {
    if (event.target.classList.contains('w3-card-4')) {
      const confirmDelete = confirm('¿Desea eliminar esta tarjeta?');
      if (confirmDelete) {
        event.target.remove();
      }
    }
  });
  
  function generateFibonacciCards(number) {
    const fibonacciContainer = document.getElementById('fibonacciCardsContainer');
    fibonacciContainer.innerHTML = ''; // Limpiamos el contenido previo
  
    let a = 0, b = 1, next;
    for (let i = 0; i < number; i++) {
      const card = document.createElement('div');
      card.className = 'w3-card-4 w3-margin w3-white';
      card.textContent = a;
      fibonacciContainer.appendChild(card);
  
      next = a + b;
      a = b;
      b = next;
    }
  }
  