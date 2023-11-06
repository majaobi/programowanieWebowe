const app = express()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const students = require('./public/api/students.js')
const subjects = require('./public/api/subjects.js')
const PORT = 8080
const db = require('./db')

app.use(bodyParser.urlencoded({ extended: false }))
app.set('json spaces', 2)
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send(`
    <h1>Strona główna</h1>
    <p>Piękny warszawski piątek, pełen przekąsek, zakąsek i ludzi, którzy gubią wątek.</p>
  `)
})

app.get('/kontakt', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'html', 'index.html')
  res.sendFile(filePath)
})

app.post('/kontakt', (req, res) => {
  const { name, email, album, message } = req.body
  const query = 'INSERT INTO messages (name, email, album, message) VALUES (?, ?, ?, ?)'
  
  db.query(query, [name, email, album, message], (err, results) => {
    if (err) {
      console.error('Błąd zapisu do bazy danych:', err)
      res.status(500).json({ error: 'Wystąpił błąd podczas zapisu wiadomości.' })
    } else {
      console.log('Wiadomość zapisana w bazie danych')
      res.redirect('/')
    }
  })
})

app.get('/api', (req, res) => {
  res.json({
    "/api/students": "Wypisuje na ekranie liste studentów",
    "/api/students/:id": "Wypisuje studenta o konkretnym id",
    "/api/subjects": "Wypisuje liste przedmiotów",
    "/api/subjects/:id": "Wypisuje przedmiot o podanym id"
  })
})


app.get('/api/students', (req, res) => {
  const query = 'SELECT * FROM students'
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Błąd odczytu z bazy danych:', err)
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' })
    } else {
      res.json(results)
    }
  })
})


app.get('/api/students/:id', (req, res) => {
  const studentId = req.params.id
  const query = 'SELECT * FROM students WHERE id = ?'
  
  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error('Błąd odczytu z bazy danych:', err)
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' })
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Nie znaleziono studenta o podanym ID.' })
    } else {
      res.json(results[0])
    }
  })
})


app.get('/api/subjects', (req, res) => {
  const query = 'SELECT * FROM subjects'
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Błąd odczytu z bazy danych:', err)
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' })
    } else {
      res.json(results)
    }
  })
})


app.get('/api/subjects/:id', (req, res) => {
  const subjectId = req.params.id
  const query = 'SELECT * FROM subjects WHERE id = ?'

  
  db.query(query, [subjectId], (err, results) => {
    if (err) {
      console.error('Błąd odczytu z bazy danych:', err)
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' })
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Nie znaleziono przedmiotu o podanym ID.' })
    } else {
      res.json(results[0])
    }
  })
})
  

app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`)
})
