import { useState, useEffect } from 'react'
import axios from 'axios'
import './services/axios.js'
import './style.css'
import Header from './components/Header.jsx'
import Button from './components/Button.jsx'
import SearchBar from './components/SearchBar.jsx'
import FilterMenu from './components/FilterMenu.jsx'
import SortMenu from './components/SortMenu.jsx'
import UserForm from './components/UserForm.jsx'
import MediaDisplay from './components/MediaDisplay.jsx'


function App() {
  const [media, setMedia] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newRating, setNewRating] = useState('')
  const [newFinishDate, setNewFinishDate] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [sort, setSort] = useState('default')
  const [showEditForm, setShowEditForm] = useState(false)
  const [newId, setNewId] = useState("")
  const [test, setTest] = useState("")
  const [searchArr, setSearchArr] = useState([])
  const [toggleSearch, setToggleSearch] = useState(false)
  const [filter, setFilter] = useState('default')
  const [toggleFilter, setToggleFilter] = useState(false)

  const BASE_URL = import.meta.env.VITE_API_URL



  useEffect(() => {
    axios.get(`${BASE_URL}/api/media`)
      .then((response) => {
        setMedia(response.data)
      })
  }, [BASE_URL])

  function addMedia(e) {
    e.preventDefault()
    let titleObject = {
      title: newTitle,
      rating: newRating,
      dateFinished: newFinishDate
    }
    axios.post(`${BASE_URL}/api/media`, titleObject)
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
    axios.delete(`${BASE_URL}/api/media/${id}`)
      .then(() => {
        setMedia(media.filter(item => item.id !== id))
      })
  }

  function editMedia(e) {
    e.preventDefault()
    let id = newId;
    console.log(id)

    axios.patch(
      `${BASE_URL}/api/media/${id}`,
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
    setShowEditForm(false)
  }




  return (
    <div>
      <Header text="Media Tracker" id="header_div" />
      <Button text="Add Media" setShowForm={setShowForm} showForm={showForm} />
      <SortMenu text="Sort By:" htmlFor="media" media={media} value={sort} setSort={setSort} setMedia={setMedia}/>

      <UserForm onSubmit={addMedia} newTitle={newTitle} setNewTitle={setNewTitle} newRating={newRating} setNewRating={setNewRating} newFinishDate={newFinishDate} setNewFinishDate={setNewFinishDate} showForm={showForm} />

      <UserForm onSubmit={editMedia} newTitle={newTitle} setNewTitle={setNewTitle} newRating={newRating} setNewRating={setNewRating} newFinishDate={newFinishDate} setNewFinishDate={setNewFinishDate} showForm={showEditForm} />

      <SearchBar value={test} setToggleSearch={setToggleSearch} setTest={setTest} setSearchArr={setSearchArr} media={media} />

      <FilterMenu media={media} filter={filter} setFilter={setFilter} toggleFilter={toggleFilter} setToggleFilter={setToggleFilter} />

      <MediaDisplay media={media} toggleFilter={toggleFilter} filter={filter} toggleSearch={toggleSearch} searchArr={searchArr} deleteMedia={deleteMedia} setNewId={setNewId} showEditForm={showEditForm} setShowEditForm={setShowEditForm} />

    </div>
  )
}

export default App