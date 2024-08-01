const Feedback = (props) => {
    return(
        <>
           {props.feedback ?  (null): (props.text)}
        </>
    )
} 

export default Feedback