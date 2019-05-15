import React from 'react'
import ReactDOM from 'react-dom'

// Kurssitiedot-tehtävät
// 1.1: Refaktoroi sovelluksen koodi siten, että se koostuu kolmesta uudesta komponentista: Header, Content ja Total.
// 1.2: Refaktoroi komponentti Content siten, että se renderöi ainoastaan kolme Part-nimistä komponenttia.
// 1.3: Muuta komponentin App muuttujamäärittelyt käyttämään olioita ja muuta sovelluksen kaikki osat vastaavasti.
// 1.4: Muuta App muuttujamäärittelyt käyttämään olioita taulukossa ja muuta sovelluksen kaikki osat vastaavasti.
// 1.5: Tee kurssista ja sen osista yksi Javascript-olio.

// Otsikko-komponentti
const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
}

// Sisältö-komponentti
const Content = (props) => {
    return (
        <div>
            <Part name={props.parts[0].name} exercises={props.parts[0].exercises}/>
            <Part name={props.parts[1].name} exercises={props.parts[1].exercises}/>
            <Part name={props.parts[2].name} exercises={props.parts[2].exercises}/>
        </div>
    )
}

// Osa-komponentti
const Part = (props) => {
    return (
        <p>{props.name} {props.exercises}</p>
    )
}

// Yhteensä-komponentti
const Total = (props) => {
    const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
    return (
      <p>Yhteensä {total} tehtävää</p>
    )
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }
    
  return (
    <div>
       <Header course={course.name} />
       <Content parts={course.parts} />
       <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
