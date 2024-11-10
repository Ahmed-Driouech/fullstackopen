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
      alert(`${newName} is already added to phonebook`)
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
    <Persons persons={persons} filteredNames={filteredNames} filter={filter}/>
  </div>
  )
}

export default App
