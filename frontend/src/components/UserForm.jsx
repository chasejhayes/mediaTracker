export default function UserForm({
  onSubmit,
  newTitle,
  setNewTitle,
  newRating,
  setNewRating,
  newFinishDate,
  setNewFinishDate,
  showForm
}) {


  if (showForm === true)
    return (
      <div>
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
      </div>
    )
}