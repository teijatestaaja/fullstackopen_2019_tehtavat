import React from 'react'

const Person = ( {person, deletePerson} ) => {
  return (
    <div>{person.name} {person.phone} <button onClick={deletePerson}>Poista</button></div>
  )
}

export default Person