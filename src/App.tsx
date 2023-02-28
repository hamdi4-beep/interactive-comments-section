import { QueryClient, QueryClientProvider } from 'react-query'

import CommentList from './components/CommentList'
import './sass/index.scss'

const queryClient = new QueryClient()

function App() {
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <CommentList />
      </QueryClientProvider>
    </div>
  )
}

export default App