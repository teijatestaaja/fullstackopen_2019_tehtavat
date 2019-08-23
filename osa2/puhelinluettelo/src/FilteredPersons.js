import React from 'react'
import Person from './Person'

const FilteredPersons = ( {filteredPersons, deletePerson} ) => {
  return (     
    filteredPersons.map(person =>
        <Person
          key={person.name}
          person={person}
          deletePerson={deletePerson(person.id)}
        />
      )
  )
}

export default FilteredPersons