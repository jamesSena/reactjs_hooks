import React , {useState}from 'react';

function App() {
const [tarefa, setTarefa]= useState([
    'Estudar Node.js',
    'Estudar ReactJS'

]);

  return (
    <div className="App">
      <ul>
        {
          tarefa.map(t=>(
            <li key={t}>{t}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
