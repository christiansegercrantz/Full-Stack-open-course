import React, { useState } from 'react'
import axios from 'axios'



const Filter = ({value, onChange}) => {
  return(
    <form>
      <div>
        Filter shown with: <input value = {value} onChange = {onChange}/>
        {console.log()}
      </div>
    </form>
  )
}

const PersonForm  = ({addPerson,newName,handleNameChange,newNumber,handleNumberChange}) => {
  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input value = {newName} onChange = {handleNameChange} />
      </div>
      <div>
        number: <input value = {newNumber} onChange = {handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Information = ({persons}) => {
  return(
    <div>
      {persons.map( person => <p key = {person.name}>{person.name} {person.number}</p> ) }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  const filteredPersons = !search ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return;
    }
    const newPersonObj = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPersonObj))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value = {search} onChange = {handleSearchChange} />
      <h2>Add new person</h2>
      <PersonForm addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <Information persons = {filteredPersons}/>
    </div>
  )
}

export default App