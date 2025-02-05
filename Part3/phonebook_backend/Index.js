const express = require('express')
const morgan = require('morgan')
const app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
//persons cant be const, otherwise we cant make changes to it with http requests
app.use(express.json())
app.use(morgan('tiny'))

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const time = new Date()
    response.send(
        `<p>Phonebook has info for 2 people</p>
         <p>${time}</p>`)
  })

app.get('/api/persons/:id', (request, response) => {
const id = request.params.id
const person = persons.find(p => p.id === id)

if(person){
    response.json(person)
}
else{
    console.log('person not found!')
    response.status(404).end()
}
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 5000) + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name){
        return response.status(400).json({ 
            error: 'missing name' 
          })
    }

    if(!body.number){
        return response.status(400).json({ 
            error: 'missing number' 
          })
    }

    const duplicateName = persons.find(p => p.name === body.name)

    if(duplicateName){
        return response.status(400).json({ 
            error: 'name must be unique' 
          })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)
    response.json(newPerson)
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})