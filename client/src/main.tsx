import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { lazy, Suspense } from 'react'
import Loading from './components/loading'


const Home = lazy(() => import('./pages/home'))

const NotFoundPage = lazy(() => import('./pages/not-found'))

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Loading />}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </Suspense>

)
