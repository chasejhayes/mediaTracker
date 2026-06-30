import { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'



function App() {
  const [media, setMedia] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newRating, setNewRating] = useState('')
  const [newFinishDate, setNewFinishDate] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [sort, setSort] = useState('default')



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
    setShowForm(false)
  }

  function deleteMedia(id) {

    axios.delete(`http://localhost:3001/api/media/${id}`)
      .then(() => {
        setMedia(media.filter(item => item.id !== id))
      })
  }


  const loginForm = () => (
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

  )

  function sortByRating(){

  }

  const mediaDisplay = () => (
    <div>
      {/* <div>{test()}</div> */}
      <ul id='card'>
        {media.map((media) =>
          <div className='list_item'>
            <li key={media.id}>
              <h1>{media.title}</h1>
              <p>Date Finished: {media.dateFinished}</p>
              <p>Rating: {media.rating}</p>
              <button onClick={() => deleteMedia(media.id)}>Delete</button>
            </li>
          </div>
        )}
      </ul>
    </div>

  )

  // function handleSortAlpha(){
  //   setSortAlpha(true)
  // }

  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    setSort(selectedValue)
    if (selectedValue === 'default') {
      console.log(media)
    } else if (selectedValue === 'al') {
      console.log('its alphabetical')
    } else if (selectedValue === 'rating'){
      console.log('its rating')
    } else if (selectedValue === 'finished'){
      console.log('its finished')
    }
  }


  function handleShowForm() {

    if (showForm == false) {
      setShowForm(true);
    } else {
      setShowForm(false)
    }
  }


  const sortMenu = () => (
    <div>
      <label htmlFor="media" >Sort by:</label>
      <select name="media" id="media" value={sort} onChange={handleSortChange}>
        <option value="default">Default</option>
        <option value="al">Alphabetical</option>
        <option value='rating'>Rating</option>
        <option value="finished">Finished</option>
      </select>
    </div>
  )




  return (
    <div>
      <h1>My Media Tracker</h1>
      <button onClick={handleShowForm}>Add Media</button>
      {sortMenu()}
      {showForm && loginForm()}
      {mediaDisplay()}

    </div>
  )
}

export default App
