const Person = ({person, handleDelete}) => (
    <p> {person.name} {person.number} <button type='submit' onClick={() =>  handleDelete(person.id)} >delete</button> </p>
  )

  const Persons = ({filteredPersons, handleDelete}) => (
    <div>
      {filteredPersons.map((person) => ( 
          <Person key={person.name} person={person} handleDelete={handleDelete}/>
        ))}
    </div>
)

export default Persons