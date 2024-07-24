import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({person, handleDelete}) => (
  <p> {person.name} {person.number} <button type='submit' onClick={() =>  handleDelete(person.id)} >delete</button> </p>
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

const Persons = ({filteredPersons, handleDelete}) => (
    <div>
      {filteredPersons.map((person) => ( 
          <Person key={person.name} person={person} handleDelete={handleDelete}/>
        ))}
    </div>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')


  useEffect(() => {    
    console.log('effect')    
    personService
    .getAll()      
    .then(response => {        
      console.log('promise fulfilled')        
      setPersons(response)      
    })  }, [])  
    console.log('render', persons.length, 'persons')

  const addPerson = (event) => {    
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
    personService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response))      
      setNewName('')  
      setNewNumber('')    
    })
  }

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    if(window.confirm(`Delete ${person.name} ?`))
    {
      personService
      .deletePerson(id)
      setPersons(persons.filter(persons => persons.id !== id))
    }
    
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
      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} handleNewName={handleNameChange}
      handleNewNumber={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} handleDelete={deletePerson}/>
    </div>
  )
}

export default App