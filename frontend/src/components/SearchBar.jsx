export default function SearchBar({ test, handleSearchChange }) {
  return (
    <label htmlFor="">Search:
      <input value={test} onChange={(e) => handleSearchChange(e)} /></label>
  )
}