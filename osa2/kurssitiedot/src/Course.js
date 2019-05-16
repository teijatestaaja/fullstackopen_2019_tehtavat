import React from 'react'

const Course = ( {course} ) => {
    return (
        <div>
          <Header title={course.name}/>
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )
}

const Header = (props) => {
    return (
      <h1>{props.title}</h1>
    )
}

const Content = (props) => {
    const allContent = props.parts.map(part => <Part key={part.id} part={part}/>)
    return(
      <div>
        {allContent}
      </div>
    )
}

const Part = ( {part} ) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Total = (props) => {
    const total = props.parts.reduce(function(sum, part){
      return sum + part.exercises
    }, 0)

    return (
      <p>Yhteensä {total} tehtävää</p>
    )
}

export default Course