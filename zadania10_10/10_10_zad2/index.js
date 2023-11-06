const app = express();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = 8080

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', (req, res) => {
  res.send(`
    <h1>Strona główna</h1>
    <p>Piękny warszawski piątek, pełen przekąsek, zakąsek i ludzi, którzy gubią wątek.</p>
  `);
});

app.get('/kontakt', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'html', 'kontakt.html');
  res.sendFile(filePath);
});

app.post('/kontakt', (req, res) => {
  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`);
});