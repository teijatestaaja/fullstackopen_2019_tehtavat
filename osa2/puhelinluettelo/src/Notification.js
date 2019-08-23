import React from 'react'

const Notification = ({ message, isError}) => {
  const errorStyle = {
    color: 'red',
    background: 'white'
  }

  const infoStyle = {
    color: 'green',
    background: 'white'
  }
 
  if (message === null) {
    return null
  }

  return (
    <div className="message" style={isError ? errorStyle : infoStyle}>
      {message}
    </div>
  )
}

export default Notification