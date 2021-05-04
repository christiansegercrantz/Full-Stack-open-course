import React, { useState, useEffect } from 'react'
import personService  from './persons.js'



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

const DeleteButton = ({handleDeleteClick,id}) => {
  return(
    <button onClick = {() => handleDeleteClick(id)}>Delete</button>
  )
}

const Information = ({persons, handleDeleteClick}) => {
  return(
    <div>
      {persons.map( person => {
        return(
          <p key = {person.name}>{person.name} {person.number} 
          <DeleteButton id = {person.id} handleDeleteClick = {handleDeleteClick}/></p>
        )
      })}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ notificationMessage, setNotificationMessage] = useState('')
  const [ errorMessage, setErrorMessage] = useState('')

  useEffect(()=> {
    personService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const filteredPersons = !search ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.some(person => person.name === newName)){
      const personToUpdate = persons.filter(person => person.name === newName)[0]
      if(window.confirm(`${newName} already exists in the phonebook, do you want to replace the old number with a new`)){
        const updatedPersonObj = {
          ...personToUpdate,
          number: newNumber
        }
        personService
          .update(updatedPersonObj, personToUpdate.id)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationMessage(`Updated ${personToUpdate.name}`)
            setTimeout(() => {
              setNotificationMessage('')
            }, 5000)
          })
          .catch((error) => {
            if(error.response.status === 400){
              setErrorMessage(error.response.data.error)
              setTimeout(() => {
                setErrorMessage('')
              }, 5000)
            } else{
              setErrorMessage(`${personToUpdate.name} has already been removed from the server`)
              setTimeout(() => {
                setErrorMessage('')
              }, 5000)
              setPersons(persons.filter(person => person.id !== personToUpdate.id))
            }})
      }
      return;
    }
    const newPersonObj = {
      name: newName,
      number: newNumber
    }
    personService
      .create(newPersonObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Added ${newPersonObj.name}`)
        setTimeout(() => {
          setNotificationMessage('')
        }, 5000)
      })
      .catch(error => { console.log(error.response.data) 
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000) 
      })
  }

  const handleDeleteClick = (id) =>  {
    const personName = persons.filter(person => person.id === id)[0].name
    if(window.confirm(`Do you want to delete ${personName}`))
    {
      personService
        .remove(id)
        .then(() =>{
          setPersons(persons.filter(person => person.id !== id))})
    }
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

  const Notification = ({message, color}) => {

    const style = {
      color: color,
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
  }
  if (message === '') {
    return null
  }

  return (
    <div style = {style}>
      {message}
    </div>
  )
}

  const SuccessNotification = ({ message }) => {
    return(
      <Notification message = {message} color = 'green'/>
    )
  }

  const ErrorNotification = ({ message }) => {
    return(
      <Notification message = {message} color = 'red'/>
    )
  }

  return (
    <div>
      <SuccessNotification message = {notificationMessage}/>
      <ErrorNotification message = {errorMessage}/>
      <h2>Phonebook</h2>
      <Filter value = {search} onChange = {handleSearchChange} />
      <h2>Add new person</h2>
      <PersonForm addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <Information persons = {filteredPersons} handleDeleteClick = {handleDeleteClick}/>
    </div>
  )
}

export default App