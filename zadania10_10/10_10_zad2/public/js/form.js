const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
  e.preventDefault(); 
  alert('Wiadomość nie może zostać wysłana!');
});