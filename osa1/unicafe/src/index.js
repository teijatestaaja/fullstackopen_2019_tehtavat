import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Unicafe-tehtävät
// 1.6: Tee Unicafelle verkossa toimiva palautesovellus. Vastausvaihtoehtoja on kolme: hyvä, neutraali ja huono.
// Sovelluksen tulee näyttää jokaisen palautteen lukumäärä.
// 1.7: Laajenna sovellusta siten, että se näyttää palautteista enemmän statistiikkaa: yhteenlasketun määrän, 
// keskiarvon (hyvän arvo 1, neutraalin 0, huonon -1) ja sen kuinka monta prosenttia palautteista on ollut positiivisia.
// 1.8: Refaktoroi sovelluksesi siten, että tilastojen näyttäminen on eriytetty oman komponentin Statistics vastuulle. 
// Sovelluksen tila säilyy edelleen juurikomponentissa App.
// 1.9: Muuta sovellusta siten, että numeeriset tilastot näytetään ainoastaan jos palautteita on jo annettu.
// 1.10: Eriytä seuraavat kaksi komponenttia: Button ja Statistic
// 1.11: Toteuta tilastojen näyttäminen HTML:n taulukkona.

const Title = ({ title }) => {
    return (
      <h1>{title}</h1>
    )
}

const Statistics = (props) => {  
  if(props.total===0){
    return(
        <p>Yhtään palautetta ei ole annettu!</p>
    )
  }
  return(
    <div>
        <table>
            <tbody>
                <Statistic option="hyvä" result={props.good} />
                <Statistic option="neutraali" result={props.neutral} />
                <Statistic option="huono" result={props.bad} />
                <Statistic option="yhteensä" result={props.total} />
                <Statistic option="keskiarvo" result={props.average} />
                <Statistic option="positiivisia" result={props.positives} />
            </tbody>
        </table>
      </div>
  )
}

const Statistic = ({ option, result }) => (
  <tr><td>{option}</td><td>{result}</td></tr>
)

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const App = () => {
  // Tallennetaan äänet omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positives, setPositive] = useState(0)
  
  const voteGood = () => {
    setGood(good+1)
    setTotal(total+1)
    countAverage('good')
    countPositiveVotes(true)
  }

  const voteNeutral = () => {
    setNeutral(neutral+1)
    setTotal(total+1)
    countAverage('neutral')
    countPositiveVotes(false)
  }

  const voteBad = () => {
    setBad(bad+1)
    setTotal(total+1)
    countAverage('bad')
    countPositiveVotes(false)
  }

 const countAverage = (newVoteType) => {
    // hyvä = 1, neutraali = 0, huono = -1
    const points = [1, 0, -1]
    // Lisätään nykyinen uusi ääni
    var votes = total+1
    var avg = 0
    
    // Lasketaan keskiarvo riippuen siitä, mitä juuri äänestettiin
    if(newVoteType==="good"){
      avg = (points[0] * (good+1) + points[2] * bad) / votes
    }else if(newVoteType==="bad"){
      avg = (points[0] * good + points[2] * (bad+1)) / votes
    }else{
      avg = (points[0] * good + points[2] * bad) / votes
    }
    // Päivitetään tilaa
    setAverage(avg.toFixed(1))
  }

  const countPositiveVotes = (newVoteIsGood) => {
    // Lisätään nykyinen uusi ääni
    var votes = total+1
    var positiveVotes = 0
    // Lasketaan positiivisten äänten % osuus ja muotoillaan tulos nollan desimaalin tarkkuuteen
    // sekä päivitetään tilaa
    if (newVoteIsGood) { 
      positiveVotes = ((good+1)/votes*100)
      setPositive(positiveVotes.toFixed(0).concat(' %'))
    }
    else { 
      positiveVotes = (good/votes*100)
      setPositive(positiveVotes.toFixed(0).concat(' %'))
    }
  }

  return (
    <div>
      <Title title="Anna palautetta"/>
      <Button handleClick={voteGood} text='Hyvä' />
      <Button handleClick={voteNeutral} text='Neutraali' />
      <Button handleClick={voteBad} text='Huono' />                  
      <Title title="Statistiikka"/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positives={positives} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
