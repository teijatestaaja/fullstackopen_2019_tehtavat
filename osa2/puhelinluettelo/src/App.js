import React, { useState, useEffect } from 'react'
import FilteredPersons from './FilteredPersons'
import Filter from './Filter'
import Notification from './Notification'
import personService from './services/persons'
import './index.css'

// Osa 2 Puhelinluettelo-tehtävät
// 2.6: Toteuta yksinkertainen puhelinluettelo, johon voi lisätä nimiä.
// 2.7: Jos lisättävä nimi on jo sovelluksen tiedossa, estä lisäys.
// 2.8: Lisää sovellukseen mahdollisuus antaa henkilöille puhelinnumero.
// 2.9: Tee lomakkeeseen hakukenttä, jonka avulla näytettävien nimien listaa voidaan rajata.
// 2.10: Refaktoroi sovellusta eriyttämällä vähintään kolme komponenttia.
// 2.11: Talleta sovelluksen alkutila projektin juureen sijoitettavaan tiedostoon db.json.
// Muuta sovellusta siten, että datan alkutila haetaan axios-kirjaston avulla palvelimelta. Hoida datan hakeminen Effect hookilla.
// 2.15: Toteuta luetteloon lisättävien uusien numeroiden synkronointi palvelimelle.
// 2.16: Siirrä palvelimen kanssa kommunikoinnista vastaava toiminnallisuus omaan moduuliin.
// 2.17: Tee ohjelmaan mahdollisuus yhteystietojen poistamiseen.
// 2.18: Muuta toiminnallisuutta siten, että jos jo olemassaolevalle henkilölle lisätään numero, korvaa lisätty numero aiemman numeron.
// 2.19: Toteuta osan 2 esimerkin parempi virheilmoitus tyyliin ruudulla muutaman sekunnin näkyvä ilmoitus, 
// joka kertoo onnistuneista operaatioista (henkilön lisäys ja poisto, sekä numeron muutos).
// 2.20: Korjaa kahden selaimen poisto-ongelma osan 2 esimerkin promise ja virheet hengessä, 
// mutta siten että käyttäjälle ilmoitetaan operaation epäonnistumisesta. Onnistuneen ja epäonnistuneen operaation ilmoitusten tulee erota toisistaan

const App = () => {
  const [ persons, setPersons ] = useState([])
  /* Testidata: = useState([
    { name: "Ankka Aku",     phone: "050-123 4567"}, 
    { name: "Ankka Iines",   phone: "040-222 2222"},
    { name: "Hanhi Hannu",   phone: "050-333 3333"},
    { name: "Ankka Tupu",    phone: "040-444 4444"},
    { name: "Ankka Taavi",   phone: "050-555 5555"},
    { name: "Ankka Touho",   phone: "040-666 6666"},
    { name: "Peloton Pelle", phone: "050-777 7777"},
    { name: "Hanhi Riitta",  phone: "040-888 8888"}
  ])*/
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filteredName, setFilteredName ] = useState('')
  const [ infoMessage, setInfoMessage ] = useState(null)
  const [ error, setError ] = useState(false)

  useEffect(() => {     
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)      
      })
  }, [])

  const deletePerson = (id) => {
    return () => {
      // Haetaan poistettava henkilö
      const personToRemove = persons.find(n => n.id === id)
      if (window.confirm("Poistetaanko " + personToRemove.name + "?")) { 
        personService
        .remove(id)
        .then(response => {
            const remainingPersons = persons.filter(n => n.id !== id)
              setPersons(remainingPersons)
            setInfoMessage("Poistettu henkilö " + personToRemove.name)
            setTimeout(() => {
              setInfoMessage(null)
            }, 2000)
        })
      }
    }
  }

  const addPerson = (event) => {    
    event.preventDefault()
    if(newPhone === "" || newName=== "" ){
      setError(true)
      setInfoMessage("Anna puuttuvat tiedot!")
      setTimeout(() => {
        setInfoMessage(null)
        setError(false)
      }, 2000)
      
      return
    }

    const names = persons.map(person => {
      return person.name.toLowerCase();
    })

    if(names.includes(newName.toLowerCase())){
      if (window.confirm(newName + " on jo lisätty, korvataanko?")) { 
        // Haetaan henkilö ja päivitetään sille vain numero (ei nimeä)
        const person = persons.find(n => n.name === newName.toLowerCase())
        const personToUpdate = { ...person, phone: newPhone }
        // Viedään päivitys palvelimelle
        personService
          .update(personToUpdate.id, personToUpdate)
          .then(response => {
            const personsUpdated = persons.filter(n => n.id !== personToUpdate.id)
            setPersons(personsUpdated.concat(personToUpdate))
            setInfoMessage("Päivitetty puhelinnumero henkilölle " + personToUpdate.name)
            setTimeout(() => {
              setInfoMessage(null)
            }, 2000)
          }).catch(error => {       
            setPersons(persons.filter(n => n.id !== personToUpdate.id))
            setError(true)
            setInfoMessage("Tiedot on aiemmin jo poistettu henkilöltä " + personToUpdate.name)
            setTimeout(() => {
              setInfoMessage(null)
              setError(false)
            }, 2000)
          })
        return
      }
      return
    }

    const newPerson = {
      name: newName,
      phone: newPhone
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewPhone('') 
    
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewPhone('')
        setInfoMessage("Lisätty henkilö " + newPerson.name)
        setTimeout(() => {
          setInfoMessage(null)
        }, 2000)
      })
  }

  const filteredNames = filteredName === '' ? persons : persons.filter(
    (person) => {
      if(person.name.toLowerCase().includes(filteredName.toLowerCase())) return person.name
      else return ""
    }
  )

  const handleNewName = (event) => {       
    setNewName(event.target.value)  
  }

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value)
  }

  const filterName = (event) => {
    setFilteredName(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      
      <Notification message={infoMessage} isError={error}/>

      <Filter value={filteredName} onChange={filterName} />
      <form onSubmit={addPerson}>
        <div>
          Nimi: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          Numero: <input value={newPhone} onChange={handleNewPhone}/>
        </div>
        <div>
          <button type="submit">Lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
        <FilteredPersons filteredPersons={filteredNames} deletePerson={deletePerson} />
    </div>
  )

}

export default App