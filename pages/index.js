import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
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

export default function Home() {
  const nomeUsuario = 'gustavosrodrigues';
  const [comunidades, setComunidades] = React.useState([{
    id: '113245', 
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    link: 'https://www.orkut.br.com/MainCommunity?cmm=10000'    
  },
  {
    id: '1235245', 
    title: 'I ♥ games',
    image: 'https://www.seekpng.com/png/full/524-5241745_joystick-vector-png-clipart-playstation-joystick-game-clip.png',
    link: 'https://www.gamevicio.com/'    
  },
  {
    id: '1335245', 
    title: 'Twin Peaks',
    image: 'https://static.wikia.nocookie.net/twinpeaks/images/9/9b/X_d0d8225c.jpg',
    link: 'https://youtu.be/XjkVgc6gIqk/'    
  }
]);

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
}, [])

console.log('seguidores antes do return', seguidores);

  // const comunidades = comunidades[0];
  // const alteradorDeComunidades/setComunidades = comunidades[1];
  const asdf = Celeste;

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

                console.log('Campo: ', dadosDoForm.get('title'));
                console.log('Campo: ', dadosDoForm.get('image'));

                const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosDoForm.get('title'),
                  image: dadosDoForm.get('image'),
                  link: dadosDoForm.get("link")
                }

                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas)
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
                  <li key={itemAtual.id}>
                    <a href={`${itemAtual.link}`}>
                      <img src={itemAtual.image} />
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
