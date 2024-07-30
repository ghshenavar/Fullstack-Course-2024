import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import Input from './Components/Input'
import Notification from './Components/Notification'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const useMessage = (message) => {
    setErrorMessage(message)        
    setTimeout(() => {          
      setErrorMessage(null)        
    }, 5000)
  }


  useEffect(() => {    
    console.log('effect')    
    personService
    .getAll()      
    .then(response => {        
      console.log('promise fulfilled')        
      setPersons(response)      
    })  }, [])  
    console.log('render', persons.length, 'persons')

    const changePerson = updatedPerson => {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            try {
              if (returnedPerson) {
                setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson));
                useMessage({error: false, text: `Information of ${newName} updated`});
                setNewName('');
                setNewNumber('');
              } else {
                throw new Error('Update failed: No person returned');
              }
            } catch (error) {
              console.error('Error during person update:', error);
            }
          })
          .catch(error => {
            useMessage({error: true, text: `Information of ${newName} has already been removed from server`});
            setPersons(persons.filter(person => person.id !== updatedPerson.id));
          });
      }
    };
    
    const addPerson = (event) => {    
    event.preventDefault()    
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }
    const checkName = persons.find(props => props.name.toLowerCase() === personObject.name.toLowerCase())
    if(checkName){
      if (checkName.number === personObject.number){
        useMessage({error: true, text:`${newName} is already added to phonebook`})
        return
      }
      const changedPerson = {...checkName, number: newNumber}
      return changePerson(changedPerson)
    }
    personService
    .create(personObject)
    .then(response => {
      setPersons(persons.concat(response))
      useMessage({error: false, text: `Added ${newName}`});      
      setNewName('')  
      setNewNumber('')    
    }).catch(error => {
      useMessage({error: true, text:error.response.data.error})
      console.log(error.response.data.error)
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
      <Notification message={errorMessage} />
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