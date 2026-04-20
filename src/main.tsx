import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuditProvider } from './context/AuditContext'
import { UIProvider } from './context/UIContext'
import { ProjectProvider } from './context/ProjectContext'
import { DocumentProvider } from './context/DocumentContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuditProvider>
        <UIProvider>
          <ProjectProvider>
            <DocumentProvider>
              <App />
            </DocumentProvider>
          </ProjectProvider>
        </UIProvider>
      </AuditProvider>
    </BrowserRouter>
  </StrictMode>,
)
