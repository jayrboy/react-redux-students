import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const port = process.env.port || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})

let students = [
  { id: '1', name: 'Jakkrit', score: 90 },
  { id: '2', name: 'Somsri', score: 80 },
  { id: '3', name: 'Sombat', score: 75 },
  { id: '4', name: 'Suwichan', score: 60 },
  { id: '5', name: 'Romyen', score: 55 },
  { id: '6', name: 'Natipong', score: 50 },
]

app.get('/api/students', (req, res) => {
  if (students.length >= 0) {
    res.status(200).send(students)
  } else {
    res.status(400).send('Not found any student')
  }
})

app.get('/api/students/:id', (req, res) => {
  const id = req.params.id
  const student = students.find((item) => item.id === id)

  if (student) {
    res.send(student)
  } else {
    res.status(400).send(`Not found student for id ${id}`)
  }
})

app.post('/api/students/', (req, res) => {
  const studentName = req.body.name
  const studentScore = req.body.score

  if (studentName.length <= 0) {
    res.status(400).send('Error cannot add student!')
  } else {
    const student = {
      id: uuidv4(),
      name: studentName,
      score: studentScore,
    }
    students.push(student)
    res.send(student)
  }
})

app.delete('/api/students/:id', (req, res) => {
  const id = req.params.id
  const student = students.find((item) => item.id === id)

  if (student) {
    const index = students.indexOf(student)
    students.splice(index, 1)
    res.send(student)
  } else {
    res.status(400).send('Error cannot delete student!')
  }
})

app.put('/api/students/:id', (req, res) => {
  const id = req.params.id
  const studentName = req.body.name
  const studentScore = req.body.score

  if (studentName.length < 1) {
    res.status(400).send('Error cannot update student!')
  } else {
    let student = students.find((item) => item.id === id)
    if (student) {
      student.name = studentName
      student.score = studentScore
      res.send(student)
    } else {
      res.status(400).send('Cannot find student to update')
    }
  }
})

app.listen(port, () =>
  console.log('Server running at http://localhost:%s', port)
)
