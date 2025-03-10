import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { lazy, Suspense } from 'react'
import Loading from './components/loading'


const Home = lazy(() => import('./pages/home'))

const NotFoundPage = lazy(() => import('./pages/not-found'))

const SignIn = lazy(() => import('./pages/auth/sign-in'))

const SignUp = lazy(() => import('./pages/auth/sign-up'))

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Loading />}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFoundPage />} />

        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </Suspense>

)
