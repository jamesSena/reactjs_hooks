import React,{useState} from 'react';
import {FaGithub, FaPlus} from 'react-icons/fa';
import {Container, From, SubmitButton} from './styles';

export default function Main(){
    const[newRepo, setNewRepo]= useState('');
    function handleinputChange (e){
        setNewRepo(e.target.value);
    }
    return(
        <Container>
           <h1>
               <FaGithub size={25}/>
                Meus Repositorios
           </h1>

           <From onSubmit={()=>{}}>
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