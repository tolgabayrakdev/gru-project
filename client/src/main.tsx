import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { lazy, Suspense } from 'react'
import Loading from './components/loading'


const Home = lazy(() => import('./pages/home'))

const NotFoundPage = lazy(() => import('./pages/not-found'))

const SignIn = lazy(() => import('./pages/auth/sign-in'))
const SignUp = lazy(() => import('./pages/auth/sign-up'))


const DashboardLayout = lazy(() => import('./layouts/dashboard-layout'))
const DashboardIndex = lazy(() => import('./pages/dashboard/index'))
const DashboardSettings = lazy(() => import('./pages/dashboard/settings'))
const CreatePreviewPage = lazy(() => import('./pages/preview/create'))

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Loading />}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFoundPage />} />

        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />

        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<DashboardIndex />} />
          <Route path='settings' element={<DashboardSettings />} />
          <Route path='preview/create' element={<CreatePreviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Suspense>

)
