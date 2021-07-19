import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import Celeste from '../public/images/Celeste.png'

function ProfileSidebar(propriedades) {
  return (
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }} />          
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
  return (    
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
         {propriedades.items.slice(0,6).map((itemAtual) => {
           console.log(itemAtual);
          return (
            <li key={itemAtual}>
                <a href={`${itemAtual.html_url}`}>
                <img src={itemAtual.avatar_url} />
                <span>{itemAtual.login}</span>
              </a> 
            </li>
          )
        })} 
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {

const nomeUsuario = props.githubUser;
const [comunidades, setComunidades] = React.useState([]);

const [seguidores, setSeguidores] = React.useState([]);
// 0 - Pegar o array de dados do github 
React.useEffect(function() {
  fetch(`https://api.github.com/users/${nomeUsuario}/followers`)
  .then(function (respostaDoServidor) {
    return respostaDoServidor.json();
  })
  .then(function(respostaCompleta) {
    setSeguidores(respostaCompleta);
  })

  // Buscando os dados no banco da DATOCMS
  fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'authorization': '7a17646bd5a3000740b097a1a5ca09', //Token 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ "query": `query {
      allCommunities {
        id 
        title
        imageUrl
        linkUrl
        creatorSlug
      }      
    }` })    
  })
  .then((response) => response.json()) // Sintaxe mais simples do .then. Pega o retorno do fetch e já retorna
  .then((respostaCompleta) => {
    const comunidadesVindasDoDato = respostaCompleta.data.allCommunities; // "data" é padrão do GraphQl, "AllCommunities" busca todas as comunidades
    console.log(comunidadesVindasDoDato)
    setComunidades(comunidadesVindasDoDato);  // Insere as comunidades do Banco na lista    
  })
  // .then(function (response) { //Método comum de retorno de json
  //   return response.json()
  // })
}, [])



console.log('seguidores antes do return', seguidores);

  // const comunidades = comunidades[0];
  // const alteradorDeComunidades/setComunidades = comunidades[1];
  
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
    'temp',
    'temp',
    'temp',
    'temp',
    'temp',
    'temp',
    'temp',
  ]

  const valorConfiavel = 3;
  const valorLegal = 2;
  const valorSexy = 2;

  return (    
    <>
      
      <AlurakutMenu githubUser={nomeUsuario}/>
      
      <MainGrid>       
        <div style={{ gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={nomeUsuario} />
        </div>      
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet confiavel={valorConfiavel} legal={valorLegal} sexy={valorSexy} />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                /* console.log('Campo: ', dadosDoForm.get('title'));
                console.log('Campo: ', dadosDoForm.get('image')); */

                const comunidade = {                  
                  title: dadosDoForm.get('title'),
                  imageUrl: dadosDoForm.get('image'),                  
                  linkUrl: dadosDoForm.get("link"),
                  creatorSlug: nomeUsuario, 
                }
                
                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)                  
                })
                .then(async (response) => { //async é seguido por await
                  const dados = await response.json();
                  console.log(dados);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas)                  
                })                
            }}>
              
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"    
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para onde você quiser"
                  name="link"
                  aria-label="Coloque uma URL para onde você quiser"
                  type="text"   
                />
              </div>

              <button>              
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} />          
          <ProfileRelationsBoxWrapper>          
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`https://github.com/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.slice(0, 6).map((itemAtual) => {
                return (
                  // itemAtual.nomeDoDado no banco
                  <li key={itemAtual.id}>
                    <a href={itemAtual.linkUrl}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>          
        </div>
      </MainGrid>

    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut-jwfelipee.vercel.app/api/auth', { //link oferecido no servidor do Discord    
    headers: {
        Authorization: token
      }      
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  console.log(isAuthenticated);


  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
} 