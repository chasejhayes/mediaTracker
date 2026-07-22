export default function Empty({ empty, text }){
  if (empty === true)
    return (
      <div>{text}</div>
    )
}

