const express = require('express');
const path = require('path');
const app = express();

app.use('/public', express.static(path.join(__dirname, 'public'))); 
app.set('json spaces',2)

const students = [
  {
    id: "1",
    name: "Maja", 
    surname: "Obidzińska", 
    email: "mobi@wp.pl"
  },
  {
    id: "2",
    name: "Filip", 
    surname: "Piątek", 
    email: "pf@wp.pl"
  },
  {
    id: "3",
    name: "Jakub", 
    surname: "Bilski", 
    email: "jb@wp.pl"
  },
  {
    id: "4",
    name: "Jakub", 
    surname: "Rabenda", 
    email: "jb@wp.pl"
  },
  {
    id: "5",
    name: "Nadia", 
    surname: "Białkowska", 
    email: "nb@wp.pl"
  },
  {
    id: "6",
    name: "Wojtek", 
    surname: "Płonka", 
    email: "wp@wp.pl"
  },
  {
    id: "7",
    name: "Kamila", 
    surname: "Kościelniak", 
    email: "kk@wp.pl"
  },
  {
    id: "8",
    name: "Kamilla", 
    surname: "Jakubowska", 
    email: "kj@wp.pl"
  },
  {
    id: "9",
    name: "Kaja", 
    surname: "Obi", 
    email: "ko@wp.pl"
  },
  {
    id: "10",
    name: "Kamilla", 
    surname: "Jakubowska", 
    email: "kj@wp.pl"
  }

]

const subjects = [
  {
    id: "1", 
    name: "Matematyka", 
    hoursAWeek: "5"
  },
  {
    id: "2", 
    name: "Informatyka", 
    hoursAWeek: "2"
  },
  {
    id: "3", 
    name: "Język Polski", 
    hoursAWeek: "3"
  },
  {
    id: "4", 
    name: "Jęyzk hiszpański", 
    hoursAWeek: "1"
  },
  {
    id: "5", 
    name: "Język angielski", 
    hoursAWeek: "3"
  },
  {
    id: "6", 
    name: "Wychowanie fizyczne", 
    hoursAWeek: "3"
  },
  {
    id: "7", 
    name: "Etyka", 
    hoursAWeek: "2"
  },
  {
    id: "8", 
    name: "Religia", 
    hoursAWeek: "1"
  },
  {
    id: "9", 
    name: "Geografia", 
    hoursAWeek: "1"
  },
  {
    id: "10", 
    name: "Chemia", 
    hoursAWeek: "1"
  }
]
 

app.get('/', (req, res) => {
  res.send(`
    <h1>Strona główna</h1>
    <p>Otwieram okno chłonąc zew morza,rześki wiatr, wielki świat, wodne bezdroża to tylko mały ja kontra ogrom przestworza i młodzi chłopcy, co pakują sobie biel w nozdrza</p>
  `);
});

app.get('/kontakt', (req, res) => {
  res.send(`
    <h1>Kontakt</h1>
    <form>
      <label for="name">Imię:
      <input type="text" id="name" name="name"><br><br>
      </label>

      <label for="email">Adres e-mail:
      <input type="email" id="email" name="email"><br><br>
      </label>

      <label for="album">Temat:

      <select id="album" name="album">
        <option value="europa">Europa</option>
        <option value="jarmark">Jarmark</option>
      </select>

      </label>
      
      <br><br>

      <label for="message">Treść wiadomości:<br>
      <textarea id="message" name="message" rows="4" cols="50"></textarea><br><br>
      </label>

      <input type="submit" value="Wyślij">
    </form>
    <script src="/public/js/form.js"></script>
  `);
});




app.get('/api', (req, res) => {
  res.json({
    "localhost:3000/api/students'": "zwraca listę minimum 10 obiektów o strukturze",
    "localhost:3000/api/students/:id'": "zwraca studenta z określonym identyfikatorem lub 404",
    "localhost:3000/api/subjects>'": "zwraca listę minimum 10 przedmiotów szkolnych w formacie",
    "localhost:3000/api/subjects/:id'": "zwraca przedmiot z określonym identyfikatorem lub 404",
  })
 })

 app.post('/api/students', (req, res) => {
  res.json(students)
 })
 app.put('/api/students/:id', (req, res) => {
  res.send('')
 })
 app.delete('/api/subjects', (req, res) => {
  res.send('')
 })
 app.delete('/api/subjects:id', (req, res) => {
  res.send('')
 })

 app.listen(3000, () => {
  console.log('Serwer uruchomiony na porcie 3000');
});