import CommentSection from './components/CommentSection'
import { store } from './store'
import {Provider} from 'react-redux'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <CommentSection />
      </Provider>
    </div>
  )
}

export default App