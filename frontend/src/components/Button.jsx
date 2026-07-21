export default function Button({ text, showForm, setShowForm }){
   function handleShowForm() {
    if (showForm == false) {
      setShowForm(true);
    } else {
      setShowForm(false)
    }
  }
  return (
    <button onClick={handleShowForm}>{text}</button>
  )
}