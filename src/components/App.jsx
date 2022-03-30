import React,{useState} from "react";
 import ImageGallery from './ImageGallery/ImageGallery';
 import Searchbar from './Searchbar';

 function App(){
   const [imageName, setImageName]=useState("");
   const handleFormSubmit =(imageName)=>{
    setImageName(imageName);}
    return (
      <div>
     <Searchbar onSubmit ={handleFormSubmit } imageName={imageName}/>
     <ImageGallery imageName={imageName} />
     </div>
    )
  }
export  default  App