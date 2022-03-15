import React, { useState, useEffect } from 'react'
import axios from 'axios'
function App() {
  const [gas, setGas] = useState(null)
  const [temperature, setTemperature] = useState(null)
  const [humidity, setHumidity] = useState(null)

  // lay data tu thinkspeak
  const fetchData = async () => {
    try { 
      const response = await axios.get('https://api.thingspeak.com/channels/1674601/feeds.json?api_key=SY6SMKASDGCMCHA6&results=1')
      const data = response.data.feeds[0]
      let { field1, field2, field3 } = data
      setGas(field1)
      setTemperature(field2)
      setHumidity(field3)
    } catch (error) {
      console.log(error)
    }
  }

  // hien thong bao
  const showAlert = () => {
    let status = true
    if (temperature) {
      if (temperature > 70 || gas > 50) {
        status = false
      }
      if (!status) {
        alert("Co xay ra chay")
      }
    }
  }

  // ham khoi tao
  useEffect(()=> {
    fetchData()
    const intervalFetchData = setInterval(() => {
      fetchData()
    }, 60000)
    return () => clearInterval(intervalFetchData)
  }, [])

  // kiem tra co chay khong khi nhiet do thay doi
  useEffect(() => {
    setTimeout(showAlert, 1000)
  }, [temperature])


  if (!gas || !temperature || !humidity) {
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
        <h3>Gas : {gas}</h3>
        ----------------------
        <h3>Temperature : {temperature}</h3>
        ----------------------
        <h3>Humidity : {humidity}</h3>
      </section>
    </main>
  )
}

export default App
