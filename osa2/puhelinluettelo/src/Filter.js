import React from 'react'

const Filter = (props) => {
  return (
    <div>
    Rajaa näytettäviä: <input value={props.value} onChange={props.onChange} />
    </div>
  )
}

export default Filter