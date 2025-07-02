require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

//persons cant be const, otherwise we cant make changes to it with http requests
app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body)})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/info', async(request, response) => {
    const time = new Date()
    const dbSize = await Person.countDocuments({})
    response.send(
        `<p>Phonebook has info for ${dbSize} people</p>
         <p>${time}</p>`)
  })

app.get('/api/persons/:id', (request, response, next) => {
const id = request.params.id
Person.findById(id)
.then(person => {
  if(person){
    return response.json(person)
  }
  else{
    return response.status(404).end()
  }
})
.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

async function updatePerson (request, response, next) {
  const {name, number} = request.body

  Person.findById(request.params.id)
  .then(person => {
    if(!person){
      response.status(404).end()
    }

    person.name = name
    person.number = number

    return person.save().then((updatedPerson) => response.json(updatedPerson))
  })
  .catch(error => next(error))
}
app.post('/api/persons', (request, response, next) => {
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

    Person.find({name: body.name})
    .then(person => {
      if(person){
        updatePerson(request,response,next)
        return console.log("Person updated!")
      }
    })
    .catch(error => next(error))

    const newPerson = new Person({
        name: body.name,
        number: body.number
    })

   return newPerson.save().then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', updatePerson)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError'){
    return response.status(400).send({error: error.message})
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})