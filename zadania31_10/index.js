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

app.post('/kontakt', async(req, res) => {
  const {name, email, subject, message} = req.body

  try{
    const resultMssage = await Prisma.message.create({  
      data: {
        name: name,
        email: email,
        subject: subject,
        message: message
      }
    })
    console.log(resultMssage)
    res.redirect('/')
  }
    catch{
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' })
    }

  
})

app.get('/api', (req, res) => {
  res.json({
    "/api/students": "Wypisuje na ekranie liste studentów",
    "/api/students/:id": "Wypisuje studenta o konkretnym id",
    "/api/subjects": "Wypisuje liste przedmiotów",
    "/api/subjects/:id": "Wypisuje przedmiot o podanym id"
  })
})


app.get('/api/students', async(req, res) => {
 
  try{
    const resultStudents = await Prisma.students.findMany({})
    console.log(resultStudents)
    res.json(resultStudents)
  }
  catch{
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' })
  }
 
})


app.get('/api/students/:id', async(req, res) => {
 const studentId = req.params.id
  try{
    const resultStudents = await Prisma.students.findMany({
      where: {
        id: parseInt(studentId)
      }
    })
    console.log(resultStudents)
    res.json(resultStudents)
  }
  catch{
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' })
  }
})


app.get('/api/subjects', async(req, res) => {
  try{
    const resultSubjects = await Prisma.subjects.findMany({})
    console.log(resultSubjects)
    res.json(resultSubjects)
  }
  catch{
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' })
  }
}
)


app.get('/api/subjects/:id', async(req, res) => {
  const subjectsId = req.params.id
  try{
    const resultSubjectsId = await Prisma.students.findMany({
      where: {
        id: parseInt(subjectsId)
      }
    })
    console.log(resultSubjectsId)
    res.json(resultSubjectsId)
  }
  catch{
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' })
  }
})
  

app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`)
})
