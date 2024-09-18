const Part = ({content})=>{
    return(
        <>
            {content.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
        </>
    )
}

export default Part