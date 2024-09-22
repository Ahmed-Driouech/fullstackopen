const Persons = (props) => {
    const { persons, filter, filteredNames } = props
    
    return(
        <>
            {filter === '' ? 
            (persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)) 
            : 
            (filteredNames.map(person => <p key={person.name}>{person.name} {person.number}</p>))}
        </>
    )
}

export default Persons