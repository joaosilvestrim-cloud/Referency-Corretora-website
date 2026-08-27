import React, { Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/app.css'

/* /admin carrega o painel; qualquer outra rota é o site.
   O painel é lazy: o site público não baixa o código do admin nem o
   supabase-auth junto. */
const isAdmin = window.location.pathname.replace(/\/+$/, '').endsWith('/admin')
  || window.location.pathname.startsWith('/admin')

const Root = isAdmin
  ? lazy(() => import('./admin/Admin'))
  : lazy(() => import('./App'))

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <Root />
    </Suspense>
  </React.StrictMode>
)
