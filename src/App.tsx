import { QueryClient, QueryClientProvider } from 'react-query'

import Section from './components/Section'
import './sass/index.scss'

const queryClient = new QueryClient()

function App() {
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <Section />
      </QueryClientProvider>
    </div>
  )
}

export default App