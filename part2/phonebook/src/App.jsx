import { useState, useEffect } from 'react'
import axios from 'axios'


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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')


  useEffect(() => {    
    console.log('effect')    
    axios
    .get('http://localhost:3001/persons')      
    .then(response => {        
      console.log('promise fulfilled')        
      setPersons(response.data)      
    })  }, [])  
    console.log('render', persons.length, 'persons')

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