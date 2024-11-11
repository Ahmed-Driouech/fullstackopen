const Persons = (props) => {
    const { persons, filter, filteredNames, handleDelete } = props
 
    return(
        <>
            {filter === '' ? 
            (persons.map(person => 
            <div key={person.id}>
                <p>{person.name} {person.number}</p>
                <button onClick={() => handleDelete(person.id)}>delete</button>
            </div>
            )) 
            : 
            (filteredNames.map(person => 
            <div key={person.id}>
                <p>{person.name} {person.number}</p>
                <button onClick={() => handleDelete(person.id)}>delete</button>
            </div>
            ))}

            
        </>
    )
}

export default Persons