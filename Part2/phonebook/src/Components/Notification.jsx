const Notification = ({ message, messageType }) => {
    if(message === null){
        return null
    }

    return(
        <>
            {messageType === 'success' ? 
            <div className="successMessage">
                {message}
            </div>
            :
            <div className="errorMessage">
                {message}
            </div>}
        </>
    )
}

export default Notification