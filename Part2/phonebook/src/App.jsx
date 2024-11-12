import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'
import personService from './Services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredNames, setFilteredNames] = useState([])

  useEffect(()=>{
    //fetch data from the JSON-server and store in the persons array
    personService
    .getAll()
    .then(allNotes =>{
      setPersons(allNotes)
    })
    
    //setting the dependencies of the useEffect to [] makes sure it only runs after the first render of the app component
  },[])

  const addName = (event) => {
    event.preventDefault()
    const nameList = persons.map(person => person.name)

    if(nameList.includes(newName)){
      const updateConfirmed = window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)
      updateConfirmed ? updatePerson() : console.log('update canceled')
    }
    else{
      const newPerson = {
        name: newName,
        number: newNumber
      }
      
      personService
      .create(newPerson)
      .then(createdPerson =>{
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })
    }

  }

  const updatePerson = () => {
    const personToUpdate = persons.find(person => person.name === newName)
    const updatedPerson = {...personToUpdate, number: newNumber}

    personService.update(personToUpdate.id, updatedPerson)
    .then(returnedPerson => {
      setPersons(persons.map(person => person.id === personToUpdate.id ? returnedPerson : person))
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
    const nameList = persons.map(person => person.name.toLowerCase())
    const filteredNameList = nameList.filter(name => name.includes(event.target.value.toLowerCase()))
    setFilteredNames(persons.filter(person => filteredNameList.includes(person.name.toLowerCase())))
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    const deleteConfirmed = window.confirm(`Delete ${personToDelete.name}?`)
    if(deleteConfirmed){
      personService.remove(id)
    }
    else{
      console.log("delete canceled")
    }
  }

  return (
    <div>
    <h2>Phonebook</h2>
    <Filter value={filter} onChange={handleFilterChange}/>
    <h3>add a new</h3>
    <PersonForm 
    onSubmit={addName} 
    nameValue={newName} 
    nameChange={handleNameChange} 
    numberValue={newNumber} 
    numberChange={handleNumberChange}/>
    <h3>Numbers</h3>
    <Persons persons={persons} filteredNames={filteredNames} filter={filter} handleDelete={handleDelete}/>
  </div>
  )
}

export default App
