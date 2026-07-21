
export default function FilterMenu({ media, setFilter, setToggleFilter}) {
  

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


    return (
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

}


