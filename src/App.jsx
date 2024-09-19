import { useEffect, useState} from 'react'
import axios from "axios"
import './App.css'

function App() {

  const [data , setData] = useState([])

  useEffect(()=>{
    axios.get("https://jsonplaceholder.typicode.com/photos")
    
    .then((response)=>{
      let createObject = response.data.reduce((oobject , otherElement) =>{
        let {albumId , thumbnailUrl , url} = otherElement
        if(!oobject[albumId]){
          oobject[albumId] = [];
        }
        oobject[albumId].push({thumbnailUrl , url})
        return oobject
      } , {})
      setData(createObject)
    })
    
    .catch((error)=>{
      console.log("Something went wrong " + error)
    })
  } , [])

  

  return (
    <>
    <h1>Reflect Application</h1>
     {Object.keys(data).map((ele,index)=>(
      <div key={index}>
      <h1>AlbumId : {ele}</h1>
     {data[ele].map((photo)=>(
      <>
      <a href={photo.url}>{photo.thumbnailUrl}</a>
      <br></br>
      </>
     ))}
      </div>
     ))}
    </>
  )
}

export default App
