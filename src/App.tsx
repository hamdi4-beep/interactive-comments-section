import Comment from "./components/Comment"
import FormComponent from "./components/FormComponent"
import data from './data.json'

function App() {
  return (
    <div className="App">
      {data.comments.map(comment => (
        <Comment
          comment={comment}
          key={comment.id}
        />
      ))}

      <FormComponent />
    </div>
  )
}

export default App