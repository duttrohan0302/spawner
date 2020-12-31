import React, {useEffect, useState} from 'react';
import './App.css';
import funcs from "./utils/api"

function App() {
  const [message,setMessage] = useState("")
  useEffect(()=>{
    async function getMsg() {
      const response = await funcs.getMessage();
      console.log(response)
      setMessage(response.data.message)
    }
    getMsg()
  })
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{message}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
