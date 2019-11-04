import React,{useState} from 'react';
import {FaGithub, FaPlus} from 'react-icons/fa';
import {Container, From, SubmitButton} from './styles';

export default function Main(){
    const[newRepo, setNewRepo]= useState('');
    const [repositorios, setRepositorios] = useState([]);
  
    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
    
        async function submit(){ 
          const response = await api.get(`repos/${newRepo}`);
      
          const data = {
            name: response.data.full_name,
          }
      
          setRepositorios([...repositorios, data]);
          setNewRepo('');
        }
    
        submit();
    
      }, [newRepo, repositorios]);


    function handleinputChange (e){
        setNewRepo(e.target.value);
    }
    return(
        <Container>
           <h1>
               <FaGithub size={25}/>
                Meus Repositorios
           </h1>

           <Form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Adicionar"
                    value={newRepo}
                    onChange={handleinputChange}
                    />
                <SubmitButton >
                    <FaPlus color="#FFF" size={14}/>
                </SubmitButton>
            </From>

        </Container>

    );

}