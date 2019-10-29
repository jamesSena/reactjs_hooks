import React , {useState, useEffect, useMemo, useCallback }from 'react';
import Routes from './routes'
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
    <Routes/>
    
  );
}

export default App;
