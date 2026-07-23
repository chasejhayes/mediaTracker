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
import Loading from './components/Loading.jsx'
import Empty from './components/Empty.jsx'
import Error from './components/Error.jsx'




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
  const [loading, setLoading] = useState(true)
  const [empty, setEmpty] = useState(false)
  const [error, setError] = useState('')

  const BASE_URL = import.meta.env.VITE_API_URL



  useEffect(() => {
    axios.get(`${BASE_URL}/api/media`)
      .then((response) => {
        if (response.data.length > 0) {
          setMedia(response.data)
        } else {
          setEmpty(true)
        }
      })
      .catch((error) => {
        console.log(error)
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [BASE_URL])

  // 

  function addMedia(e) {
    e.preventDefault()

    function sortByTitle(res) {
      const sortedMedia = [res, ...media]
      return setMedia(
        sortedMedia.toSorted((a, b) => a.title.localeCompare(b.title))
      )

    }

    let titleObject = {
      title: newTitle,
      rating: newRating,
      dateFinished: newFinishDate
    }
    axios.post(`${BASE_URL}/api/media`, titleObject)
      .then(res => {
        console.log(res)
        if (sort === 'default') {
          console.log(sort)
          console.log(media)
          setMedia([res.data, ...media])
        } else if (sort === 'al') {
          console.log(sort)
          console.log(media)
          sortByTitle(res.data)
        }
        setNewTitle('')
        setNewRating('')
        setNewFinishDate('')
        setEmpty(false)
      })
    setShowForm(false)
  }

  function deleteMedia(id) {
    axios.delete(`${BASE_URL}/api/media/${id}`)
      .then(() => {
        setMedia(media.filter(item => item.id !== id))
        if (media.length === 1) {
          setEmpty(true)
        }
      }
      )
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
      <SortMenu text="Sort By:" htmlFor="media" media={media} value={sort} setSort={setSort} setMedia={setMedia} />

      <UserForm onSubmit={addMedia} newTitle={newTitle} setNewTitle={setNewTitle} newRating={newRating} setNewRating={setNewRating} newFinishDate={newFinishDate} setNewFinishDate={setNewFinishDate} showForm={showForm} />

      <UserForm onSubmit={editMedia} newTitle={newTitle} setNewTitle={setNewTitle} newRating={newRating} setNewRating={setNewRating} newFinishDate={newFinishDate} setNewFinishDate={setNewFinishDate} showForm={showEditForm} />

      <SearchBar value={test} setToggleSearch={setToggleSearch} setTest={setTest} setSearchArr={setSearchArr} media={media} />

      <FilterMenu media={media} filter={filter} setFilter={setFilter} toggleFilter={toggleFilter} setToggleFilter={setToggleFilter} />

      <Loading text="Loading content" loading={loading} />

      <Empty text="Add Media!" empty={empty} />

      <Error error={error} text={`${error}`} />

      <MediaDisplay media={media} toggleFilter={toggleFilter} filter={filter} toggleSearch={toggleSearch} searchArr={searchArr} deleteMedia={deleteMedia} setNewId={setNewId} showEditForm={showEditForm} setShowEditForm={setShowEditForm} />

    </div>
  )
}

export default App