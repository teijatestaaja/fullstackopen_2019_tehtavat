import React from 'react'
import ReactDOM from 'react-dom'
import Course from './Course'

// Osan 2 Kurssitiedot-tehtävät
// 2.1: Määrittele sovellukseen yksittäisen kurssin muotoilusta huolehtiva komponentti Course.
// 2.2: Ilmoita myös kurssin yhteenlaskettu tehtävien lukumäärä.
// 2.3: Laske koodissasi tehtävien määrä taulukon metodilla reduce
// 2.4: Laajenna sovellusta siten, että kursseja voi olla mielivaltainen määrä.
// 2.5: Määrittele komponentti Course omana moduulinaan, jonka komponentti App importtaa. 

const App = () => {
  const courses = [
    {
      name: 'Half Stack -sovelluskehitys',
      id: 1,
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
          name: 'Komponenttien tila',
          exercises: 14,
          id: 3
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewaret',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]  
    return (
      <div>
        <h1>Opetusohjelma</h1>
        {courses.map(course => <Course key={course.id} course={course}/>)}
      </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
