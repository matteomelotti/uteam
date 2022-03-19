import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import ApplicationRouter from './ApplicationRouter'
import { RecoilRoot } from 'recoil'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './scss/style.scss'
import Loader from './app/components/Loader'
import Notifications from './app/components/notifications'

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false
      }
    }
  })

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <React.Suspense fallback={<Loader />}>
            <ApplicationRouter />
          </React.Suspense>
          <Notifications />
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
