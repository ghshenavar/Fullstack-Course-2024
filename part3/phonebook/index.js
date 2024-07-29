require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json()); 
app.use(express.static('dist'))

const morgan = require('morgan')

// use tiny for all but post requests
app.use(morgan('tiny', {
    skip: (req, res) => req.method === 'POST'
  }));

// 3.8: use custom format for post requests
morgan.token('body', (req) => JSON.stringify(req.body));
const customFormat = ':method :url :status :res[content-length] - :response-time ms :body';
app.use(morgan(customFormat, { 
    skip: (req, res) => req.method !== 'POST' 
}));

const cors = require('cors')

app.use(cors())

const Person = require('./models/person')


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

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
    response.json(people)
  }).catch((err) => {
    console.log("Error!", err)
    mongoose.connection.close()
  });
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
  })


  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

app.get('/info', (request, response) => {
    const date = new Date()
    const info = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`;
    response.send(info)
  })

  app.post('/api/persons', (request, response) => { 
    const { name, number } = request.body;


    if (!name || !number) {
        return response.status(400).json({ 
          error: 'name or number missing' 
        })
      }

    const person = new Person({
        name: name,
        number: number,
      })
  
    person.save()
        .then(person => {
          response.json(person)
        })
        .catch(error => next(error))
  })

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

