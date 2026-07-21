
export default function Header({ text, id }){
  return (
    <div id={id}>
      <h1>{text}</h1>
    </div>
  )
}