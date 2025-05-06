import data from './data.json'

function App() {
  console.log(data)

  return (
    <div className="App">
      <img src={data.currentUser.image.png} alt="" />
    </div>
  )
}

export default App