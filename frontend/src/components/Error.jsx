  export default function Error({error, text}){
    if (error !== '')
      return(
        <div>{text}</div>
      )
  }