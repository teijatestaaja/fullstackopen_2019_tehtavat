import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Anekdootti-tehtävät
// 1.12: Laajenna sovellusta siten, että siihen tulee nappi, jota painamalla sovellus näyttää satunnaisen 
// ohjelmistotuotantoon liittyvän anekdootin.
// 1.13: Laajenna sovellusta siten, että näytettävää anekdoottia on mahdollista äänestää.
// 1.14: Laajenna sovellusta siten, että se näyttää eniten ääniä saaneen anekdootin.

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(6).fill(0))
    const [mostVoted, setMostVoted] = useState(0)

    const setRandomAnecdote = () => {
        const random = Math.floor(Math.random()*6) 
        setSelected(random)
    }

    const registerVote = () => {
        // Lisätään valitulle ääni
        const copyOfVotes = [...votes]
        copyOfVotes[selected] += 1
        setVotes(copyOfVotes)
        // Päivitetään eniten äänestettyä
        const indexOfBest = copyOfVotes.indexOf(Math.max(...copyOfVotes))
        setMostVoted(indexOfBest)
    }

    return (
      <div>
        <h3>Anecdote of the day</h3>
        <p>{props.anecdotes[selected]}</p>
        <p>This anecdote has {votes[selected]} votes.</p>
        <button onClick={registerVote}>Vote</button>
        <button onClick={setRandomAnecdote}>Next anecdote</button>
        <h3>Anecdote with most votes</h3>
        <p>{props.anecdotes[mostVoted]}</p>
        <p>This anecdote has {votes[mostVoted]} votes.</p>
      </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)