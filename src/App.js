import React , {useState, useEffect }from 'react';

function App() {
const [tarefa, setTarefa]= useState([]);

const [input, setInput] = useState('');


useEffect(()=>{
  const localStorageTarefa = localStorage.getItem('tarefas');
  if(localStorageTarefa){
    setTarefa(JSON.parse(localStorageTarefa));
  }
},[]);

useEffect(()=>{
  localStorage.setItem('tarefas', JSON.stringify(tarefa));
},[tarefa]);

function Adicionar(){
  setTarefa([... tarefa, input]);
  setInput('');
}


  return (
    <div className="App">
      <ul>
        {
          tarefa.map(t=>(
            <li key={t}>{t}</li>
          ))
        }
      </ul>
      <input type='text' value={input} onChange={(e)=> setInput(e.target.value)}/>
      <button onClick={Adicionar}>Adicionar</button>
    </div>
  );
}

export default App;
