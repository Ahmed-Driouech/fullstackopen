const Statistics = (props) => {
    return(
        <>
           {props.feedback ?  (<p>{props.text} {props.value}</p>): (null)}
        </>
    )
} 

export default Statistics