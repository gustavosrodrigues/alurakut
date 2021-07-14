import { createGlobalStyle, ThemeProvider } from 'styled-components'


/* Reset CSS */

const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {    
  background-image: url("https://wallpapercave.com/wp/wp4162202.png");
  background-size : 100%;
  background-repeat: no-repeat;
  font-family: sans-serif; 
 }

 #__next {
   display: flex;
   min-height: 100vh;
   flex-direction: column;
 }

 img {
   max-width: 100%;
   height: auto;
   display: block;
 }
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
