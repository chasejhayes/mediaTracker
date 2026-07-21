export default function SearchBar({ test, setToggleSearch, setTest, setSearchArr, media }) {

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
    <label htmlFor="">Search:
      <input value={test} onChange={(e) => handleSearchChange(e)} /></label>
  )
}