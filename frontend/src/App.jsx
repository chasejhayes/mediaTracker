import { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'

const Header = ({ text, id }) => {
  return (
    <div id={id}>
      <h1>{text}</h1>
    </div>
  )
}


const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}


const SortMenu = ({ options, selectedValue, onChange, text, htmlFor }) => (
  <div>
    <label htmlFor={htmlFor}>{text}</label>
    <select name="media" id="media" value={selectedValue} onChange={onChange}>
      <option value="">Select an Options...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

function UserForm({
  onSubmit,
  newTitle,
  setNewTitle,
  newRating,
  setNewRating,
  newFinishDate,
  setNewFinishDate }) {
    
  return (
    <form onSubmit={onSubmit}>
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
}

function SearchBar({test, handleSearchChange}){
  return (
      <label htmlFor="">Search:
      <input value={test} onChange={(e) => handleSearchChange(e)} /></label>
  )
}




function App() {
  const [media, setMedia] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newRating, setNewRating] = useState('')
  const [newFinishDate, setNewFinishDate] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [sort, setSort] = useState('default')
  const [filter, setFilter] = useState('default')
  const [toggleFilter, setToggleFilter] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [newId, setNewId] = useState("")
  const [test, setTest] = useState("")
  const [searchArr, setSearchArr] = useState([])
  const [toggleSearch, setToggleSearch] = useState(false)




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


  




  // const editForm = () => (
  //   <form onSubmit={editRating}>
  //     <label> Rating:
  //       <input
  //         value={newRating}
  //         onChange={(e) => setNewRating(e.target.value)}
  //       />
  //     </label>
  //     <label>Title:
  //       <input
  //         value={newTitle}
  //         onChange={(e) => setNewTitle(e.target.value)}
  //       />
  //     </label>
  //     <label>
  //       <input
  //         value={newFinishDate}
  //         onChange={(e) => setNewFinishDate(e.target.value)}
  //       />
  //     </label>
  //     <button type="submit">
  //       Enter
  //     </button>
  //   </form>
  // )



  const sortOptions = [
    { value: "al", label: "Alphabetical" },
    { value: "rating", label: "Rating" },
    { value: "finished", label: "Finished" }
  ]

  function editRating(e) {
    e.preventDefault()
    let id = newId;
    console.log(id)

    axios.patch(
      `http://localhost:3001/api/media/${id}`,
      {
        rating: newRating,
        title: newTitle,
        dateFinished: newFinishDate
      }
    )
      .then(response => {
        setMedia(media.map(item =>
          item.id === id
            ? response.data
            : item
        ))
      })
      .catch(error => {
        console.log(error)
      })
  }



  function handleShowForm() {
    if (showForm == false) {
      setShowForm(true);
    } else {
      setShowForm(false)
    }
  }

  function handleShowEditForm() {
    if (showEditForm == false) {
      setShowEditForm(true)
    } else {
      setShowEditForm(false)
    }
  }

  const mediaDisplay = () => {
    let displayType = media;
    if (toggleFilter) {
      displayType = filter
    } else if (toggleSearch) {
      displayType = searchArr
    }

    return (
      <div>
        <ul id='card'>
          {displayType.map((media) =>
            <div className='list_item'>
              <li key={media.id}>
                <h2>{media.title}</h2>
                <p>Date Finished: {media.dateFinished}</p>
                <p>Rating: {media.rating}</p>
                <button onClick={() => deleteMedia(media.id)}
                >Delete</button>
                <button onClick={() => { setNewId(media.id); handleShowEditForm() }}>
                  Edit
                </button>
              </li>
            </div>
          )}
        </ul>
      </div>
    )
  }




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
      setToggleFilter(false)
    } else if (selectedValue === "one") {
      setToggleFilter(true)
      return setFilter(media.filter(media => media.rating === 1))
    }
    else if (selectedValue === "two") {
      setToggleFilter(true)
      return setFilter(media.filter(media => media.rating === 2))
    } else if (selectedValue === "three") {
      setToggleFilter(true)
      return setFilter(media.filter(media => media.rating === 3))
    }
    else if (selectedValue === "four") {
      setToggleFilter(true)
      return setFilter(media.filter(media => media.rating === 4))
    } else if (selectedValue === "five") {
      setToggleFilter(true)
      return setFilter(media.filter(media => media.rating === 5))
    }
  }



  const filterMenu = () => (
    <div>
      <label htmlFor="media">Filter by Rating</label>
      <select name="media" id="media" onChange={handleFilterChange}>
        <option value="default">All</option>
        <option value="one">1 Star</option>
        <option value="two">2 Star</option>
        <option value="three">3 Star</option>
        <option value="four">4 Star</option>
        <option value="five">5 Star</option>
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


  const searchBar = () => (
    <label htmlFor="">Search:
      <input value={test} onChange={(e) => handleSearchChange(e)} /></label>
  )

  const handleSearchChange = (e) => {
    setToggleSearch(true)
    setTest(e.target.value)
    let filtered = media.filter(media => media.title.startsWith(e.target.value))
    setSearchArr(filtered)
    if (e.target.value === "") {
      setToggleSearch(false)
    }
  }



  return (
    <div>
      <Header text="My media" id="header_div" />
      <Button text="Add Media" onClick={handleShowForm} />
      <SortMenu text="Sort By:" htmlFor="media" onChange=
      {handleSortChange} value={sort} options={sortOptions} />

      <UserForm onSubmit={addMedia} newTitle={newTitle} setNewTitle={setNewTitle} newRating={newRating} setNewRating={setNewRating} newFinishDate={newFinishDate} setNewFinishDate={setNewFinishDate} />

      <UserForm onSubmit={editRating} newTitle={newTitle} setNewTitle={setNewTitle} newRating={newRating} setNewRating={setNewRating} newFinishDate={newFinishDate} setNewFinishDate={setNewFinishDate} />

      <SearchBar value={test} handleSearchChange={handleSearchChange} />

      {filterMenu()}
      {/* {showForm && addMediaForm()} */}
      {mediaDisplay()}
      {/* {showEditForm && editForm()} */}


    </div>
  )
}

export default App


