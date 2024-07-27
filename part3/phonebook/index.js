const express = require('express')
const app = express()

app.use(express.json()); 

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
  response.json(persons)
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

    else if (persons.find(person => person.name === name)) {
        return response.status(400).json({ 
          error: 'name must be unique' 
        })
      }
    
      const person = {
        id: Math.floor(Math.random() * 1000),
        name: name,
        number: number,
      }
    
      persons = persons.concat(person)
    
      response.json(person)
    })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})