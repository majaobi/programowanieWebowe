const app = express();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const students = require('./public/api/students.js')
const subjects = require('./public/api/subjects.js')
const PORT = 8080

app.use(bodyParser.urlencoded({ extended: false }));
app.set('json spaces', 2)
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', (req, res) => {
  res.send(`
    <h1>Strona główna</h1>
    <p>Piękny warszawski piątek, pełen przekąsek, zakąsek i ludzi, którzy gubią wątek.</p>
  `);
});

app.get('/kontakt', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'html', 'index.html');
  res.sendFile(filePath);
});

app.post('/kontakt', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

app.get('/api', (req, res) => {
  res.json({
    "/api/students": "WYpisuje na ekranie liste studentów",
    "/api/students/:id": "Wypisuje studenta o konkretnym id",
    "/api/subjects": "Wypisuje liste przedmiotów",
    "/api/subjects/:id": "Wypisuje przedmiot o podanym id"
  });
});


app.get('/api/students', (req, res) => {
  res.json(students);
});


app.get('/api/students/:id', (req, res) => {
  console.log(req.params.id)
  const student = students.find(s => s.id === parseInt(req.params.id));

  if (student) {
    res.json(student);
  } 
  else {
    res.status(404).send('Nie znaleziono studenta');
  }
});


app.get('/api/subjects', (req, res) => {
  res.json(subjects);
});


app.get('/api/subjects/:id', (req, res) => {

  const subject = subjects.find(s => s.id === parseInt(req.params.id));

  if (subject) {
    res.json(subject);
  } 
  else {
    res.status(404).send('Nie znaleziono przedmiotu');
  }

});

app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`);
});
