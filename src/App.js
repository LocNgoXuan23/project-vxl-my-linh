import React, { useState, useEffect } from 'react'
import axios from 'axios'
function App() {
  const [co2, setCo2] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [humidity, setHumidity] = useState(null)

  const fetchData = async () => {
    try { 
      const response = await axios.get('https://api.thingspeak.com/channels/1674601/feeds.json?api_key=SY6SMKASDGCMCHA6&results=1')
      const data = response.data.feeds[0]
      let { field1, field2, field3 } = data
      setCo2(field1)
      setTemperature(field2)
      setHumidity(field3)
    } catch (error) {
      console.log(error)
    }
  }

  const showAlert = () => {
    let message = `${temperature > 100 ? 'Canh bao nhiet do cao. ' : ''}${co2 > 50 ? 'Canh bao o nhiem. ' : ''}${humidity > 10 ? 'Co mua. ' : ''}`
    if (message) {
      alert(message)
    }
  }

  useEffect(()=> {
    fetchData()
    const intervalFetchData = setInterval(() => {
      fetchData()
    }, 60000)
    return () => clearInterval(intervalFetchData)
  }, [])

  useEffect(() => {
    setTimeout(showAlert, 1000)
  }, [temperature, co2, humidity])


  if (!co2 || !temperature || !humidity) {
    return (
      <main>
        <section className='container'>
          <h3>Loading..............</h3>
        </section>
      </main>
    )
  }


  return (
    <main>
      <section className='container'>
        <h3>Co2 : {co2}</h3>
        ----------------------
        <h3>Temperature : {temperature}</h3>
        ----------------------
        <h3>Humidity : {humidity}</h3>
      </section>
    </main>
  )
}

export default App
