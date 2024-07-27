const Notification = ({ message}) => {
    if (message === null) {
      return null
    }
  
    const { error, text } = message;
  
    return (
      <div className={error ? "error" : "message"}>
        {text}
      </div>
    )
  }

  export default Notification