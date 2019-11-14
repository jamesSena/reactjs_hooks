import React, {useState, useEffect} from 'react';
import {Container, Owner, Loading, BackButton, IssuesList, PageActions} from './styles';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';

export default function Repositorio({match}){

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

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

  useEffect(()=> {
    console.log("Alterou o status do componente PAGE");

    async function loadIssue(){
      const nomeRepo = decodeURIComponent(match.params.repositorio);

      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params:{
          state: 'open',
          page:page,
          per_page: 5,
        },
      });

      setIssues(response.data);

    }

    loadIssue();

  }, [page]);

 
  function handlePage(action){
    setPage(action === 'back' ? page - 1 : page + 1 )
  }
  //Se as informações ainda não estão carregadas, retornar uma mensagem
  if(loading){
    return(
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    )
  }
  
  return(
    //Voltar, usando o icon do react-icons
    <Container>
        <BackButton to="/">
          <FaArrowLeft color="#000" size={30} />
          Voltar
        </BackButton>

        <Owner>
          <img //Exibindo as informações do dono do repositorio
            src={repositorio.owner.avatar_url} 
            alt={repositorio.owner.login} 
            />
          <h1>{repositorio.name}</h1>
          <p>{repositorio.description}</p>
        </Owner>

      
        <IssuesList>
          {issues.map(issue => (//Exibindo a lista de problemas
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />

              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>

                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}

                </strong>

                <p>{issue.user.login}</p>

              </div>

            </li>
          ))}
        </IssuesList>
        <PageActions>
          <button 
          type="button" 
          onClick={()=> handlePage('back') }
          disabled={page < 2}
          >
            Voltar
          </button>

          <button type="button" onClick={()=> handlePage('next') }>
            Proxima
          </button>
        </PageActions>
    </Container>
    
  )
}