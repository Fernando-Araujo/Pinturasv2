import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

// HashRouter (e não BrowserRouter) porque o app pode ser aberto direto de um
// arquivo ou de um servidor estático simples, sem regra de rewrite.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
