import { useState, useEffect } from 'react'
import axios from 'axios'



function App() {
  const [media, setMedia] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newRating, setNewRating] = useState('')
  const [newFinishDate, setNewFinishDate] = useState('')
  const [newID, setNewID] = useState('')
  
 

  useEffect(() => {
    axios.get('http://localhost:3001/api/media')
      .then((response) => {
        setMedia(response.data)
      })
  }, [])

  function addMedia(e) {
    e.preventDefault()


    let titleObject = {
      title: newTitle,
      rating: newRating,
      dateFinished: newFinishDate
    }

    axios.post('http://localhost:3001/api/media', titleObject)
      .then(res => {
        console.log(res)
        setMedia(media.concat(res.data))
      
        setNewTitle('')
        setNewRating('')
        setNewFinishDate('')

        console.log(media)
      })
  }

  function deleteMedia(id){

    axios.delete(`http://localhost:3001/api/media/${id}`)
    .then(() => {
      setMedia(media.filter(item=>item.id !== id))
    })
  }



  return (
    <div>
      <h1>Test</h1>
      <form onSubmit={addMedia}>
        <label>Title:
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)} />
        </label>
        <label>Rating:
          <input
            value={newRating}
            onChange={(e) => setNewRating(e.target.value)} />
        </label>
        <label>Finish Date:
          <input
            value={newFinishDate}
            onChange={(e) => setNewFinishDate(e.target.value)} />
        </label>
        <button type="submit">add</button>
      </form>
      <ul>
        {media.map((media) => 
          <li key={media.id}>
            <h1>{media.title}</h1>
            <p>Date Finished: {media.dateFinished}</p>
            <p>Rating: {media.rating}</p>
            <button onClick={() => deleteMedia(media.id)}>Delete</button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default App
