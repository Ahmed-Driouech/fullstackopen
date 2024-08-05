const StatisticLine = (props) => {
    return(
        <>
           {props.feedback ?  (<tr><td>{props.text}</td> <td>{props.value}</td></tr>): (null)}
        </>
    )
} 

export default StatisticLine