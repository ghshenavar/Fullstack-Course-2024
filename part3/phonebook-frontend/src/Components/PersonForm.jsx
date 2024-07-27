import Input from "./Input"

const PersonForm = ({ onSubmit, newName, newNumber, handleNewName, handleNewNumber}) => (
    <form onSubmit={onSubmit}>
        <Input text='name:' value={newName} handleChange={handleNewName}/>
        <Input text='number:' value={newNumber} handleChange={handleNewNumber}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

export default PersonForm