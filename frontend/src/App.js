import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import ApplicationRouter from './ApplicationRouter'
import { RecoilRoot } from 'recoil'
import './App.css'
import './scss-new/style.scss'
import Notifications from './app/components/notifications'
import { SocketContext, socket } from 'context/socket'

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
        <SocketContext.Provider value={socket}>
          <ApplicationRouter />
        </SocketContext.Provider>
        <Notifications />
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export default App
