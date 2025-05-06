import Comment from "./components/Comment"
import data from './data.json'

function App() {
  return (
    <div className="App">
      {data.comments.map(comment => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  )
}

export default App