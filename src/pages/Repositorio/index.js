import React, {useState, useEffect} from 'react';
import {Container} from './styles';
import api from '../../services/api';

export default function Repositorio({match}){

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    
    async function load(){
        //Nome do repositorio que ele digitou
      const nomeRepo = decodeURIComponent(match.params.repositorio);

      //Executando duas consultas no mesmo tempo
      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),//repositorioData
        api.get(`/repos/${nomeRepo}/issues`, {
          params:{ //Passando parametros
            state: 'open',
            per_page: 5
          }
        })
      ]);
      console.log(repositorioData.data);
      console.log(issuesData.data);

      setRepositorio(repositorioData.data);
      setIssues(issuesData.data);
      setLoading(false);

    }

    load();

  }, [match.params.repositorio]);

  return(
    <Container>

    </Container>
  )
}