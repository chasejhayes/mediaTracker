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
  const [filter, setFilter] = useState('default')



  useEffect(() => {
    axios.get('http://localhost:3001/api/media')
      .then((response) => {
        setMedia(response.data)
      })
  }, [])

  function editRating(id){
    axios.patch(
      `http://localhost:3001/api/media/${id}`,
      {
        rating: 5
      }
    )
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }



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


  function handleShowForm() {
    if (showForm == false) {
      setShowForm(true);
    } else {
      setShowForm(false)
    }
  }



  const mediaDisplay = () => (
    <div>
      <ul id='card'>
        {media.map((media) =>
          <div className='list_item'>
            <li key={media.id}>
              <h2>{media.title}</h2>
              <p>Date Finished: {media.dateFinished}</p>
              <p>Rating: {media.rating}</p>
              <button onClick={() => deleteMedia(media.id)}
              >Delete</button>
              {/* <button onClick={() => editMedia(media.id)}>
                Edit
              </button> */}
            </li>
          </div>
        )}
      </ul>
    </div>

  )


  const handleSortChange = (e) => {
    const selectedValue = e.target.value;
    setSort(selectedValue)
    if (selectedValue === 'default') {
      console.log(media)
    } else if (selectedValue === 'al') {
      sortByTitle()
      console.log(media)
    } else if (selectedValue === 'rating') {
      sortByRating()
    } else if (selectedValue === 'finished') {
      sortByDate()
      console.log(media)
    }
  }

  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'default') {
      console.log(media)
    } else if (selectedValue === "one") {
      console.log("one")
    }
  }

  const filterMenu = () => (
    <div>
      <label htmlFor="media">Filter by Rating</label>
      <select name="media" id="media" value={filter} onChange={handleFilterChange}>
        <option value="default">All</option>
        <option value="one">1 Star</option>
        <option value="two">2 Star</option>
        <option value="three">3 Star</option>
        <option value="four">4 Star</option>
        <option value="five">5 Star</option>
      </select>
    </div>
  )


  const sortMenu = () => (
    <div>
      <label htmlFor="media">Sort by:</label>
      <select name="media" id="media" value={sort} onChange={handleSortChange}>
        <option value="default"></option>
        <option value="al">Alphabetical</option>
        <option value='rating'>Rating</option>
        <option value="finished">Finished</option>
      </select>
    </div>
  )

  function sortByRating() {
    return setMedia(
      media.sort((a, b) => b.rating - a.rating)
    )
  }

  function sortByTitle() {
    return setMedia(
      media.toSorted((a, b) => a.title.localeCompare(b.title))
    )
  }

  function sortByDate() {
    return setMedia(
      media.sort((a, b) => new Date(b.dateFinished) - new Date(a.dateFinished))
    )
  }


  return (
    <div>
      <div id="header_div">
        <h1>My Media Tracker</h1>
      </div>
      <button onClick={handleShowForm}>Add Media</button>
      {sortMenu()}
      {filterMenu()}
      {showForm && loginForm()}
      {mediaDisplay()}
      {editRating(3)}

    </div>
  )
}

export default App



// go through fullstackopen lesson to add put that can be tested in postman
// make a form (not pop up for now) that can be tied to the edit button
// connect the submitted form data to the put request
// patch?

// Filter
// Only show certain ratings
// So on render only display those == selection