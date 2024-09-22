import { useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredNames, setFilteredNames] = useState([])

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
  
      setPersons(persons.concat(newPerson))
    }

    setNewName('')
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
