import { useState } from 'react'

const Person = ({person}) => (
  <p> {person.name} {person.number}</p>
)

const Input = ({text, value, handleChange}) => (
  <div>
    {text} <input value={value} onChange={handleChange} />
  </div>
)

const PersonForm = ({ onSubmit, newName, newNumber, handleNewName, handleNewNumber}) => (
    <form onSubmit={onSubmit}>
        <Input text='name:' value={newName} handleChange={handleNewName}/>
        <Input text='number:' value={newNumber} handleChange={handleNewNumber}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

const Persons = ({filteredPersons}) => (
    <div>
      {filteredPersons.map((person) => ( 
          <Person key={person.name} person={person}/>
        ))}
    </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const addName = (event) => {    
    event.preventDefault()    
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }
    const checkName = persons.find(props => props.name.toLowerCase() === personObject.name.toLowerCase())
    if(checkName){
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')  
    setNewNumber('')
  }

  const handleSearchChange = (event) => { 
    setSearchTerm(event.target.value)
  }

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNameChange = (event) => {
    console.log(event.target.value)    
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)    
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Input text='filter shown with' value={searchTerm} handleChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm onSubmit={addName} newName={newName} newNumber={newNumber} handleNewName={handleNameChange}
      handleNewNumber={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App