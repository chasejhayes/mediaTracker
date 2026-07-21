export default function SortMenu({
    selectedValue,
    text,
    htmlFor,
    media,
    setMedia,
    setSort
}){

const sortOptions = [
    { value: "al", label: "Alphabetical" },
    { value: "rating", label: "Rating" },
    { value: "finished", label: "Finished" }
]

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
        <label htmlFor={htmlFor}>{text}</label>
        <select name="media" id="media" value={selectedValue} onChange={handleSortChange}>
            <option value="">Select an Options...</option>
            {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
)
}