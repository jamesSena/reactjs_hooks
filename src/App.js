import React , {useState, useEffect, useMemo, useCallback }from 'react';

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

const Adicionar = useCallback(() => {
  setTarefa([... tarefa, input]);
  setInput('');
},[input, tarefa])

const totalTarefas = useMemo(()=>tarefa.length,[tarefa]);



  return (
    <div className="App">
      <ul>
        {
          tarefa.map(t=>(
            <li key={t}>{t}</li>
          ))
        }
      </ul>
      <strong> Você tem {totalTarefas} Tarefas! </strong><br/>
      <input type='text' value={input} onChange={(e)=> setInput(e.target.value)}/>
      <button onClick={Adicionar}>Adicionar</button>
    </div>
  );
}

export default App;
