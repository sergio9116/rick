
import { useEffect, useRef, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import LocationData from './components/LocationData';
import ResidentCard from './components/ResidentCard';

function App() {
  const [inputValue, setInputValue] = useState(Math.floor(Math.random() * 126) + 1);

  const [location, getLocation, isLoading, hasError] = useFetch ();

  useEffect(() => {
    const url =`https://rickandmortyapi.com/api/location/${inputValue}`;
    getLocation(url);
  }, [inputValue]);
  
  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault()
    const newInputValue = textInput.current.value.toLowerCase().trim()

    if (!isNaN(newInputValue) && parseInt(newInputValue) > 0) {
      setInputValue(newInputValue)
    } else {
      console.log('Debes proporcionar un número válido y positivo')
    }
    textInput.current.value = ''
  }

  return (
    <>
    {
      isLoading ?
        <h2>Loading...</h2>
        :
        <div className='app'>
          <img className='image' src="../assets/Frame259.webp" alt="" />
          <form className='app__form' onSubmit={handleSubmit}>
            <input className='app__inpur' type="text" ref={textInput}/>
            <button className='app__btn'>Search</button>
          </form>
          {
            hasError || inputValue==='0'?
              <h2>Hey, you must provide an id from 1 to 126</h2>
              :
              <>
                <LocationData
                  location={location}
                />
                <div className='app__container'>
                  {
                    location?.residents.map(resident => (
                      <ResidentCard
                        key={resident}
                        url={resident}
                      />
                    ))
                  }
                </div>
              </>

          }
        </div>
     }
    </>
  )
}

export default App;
