// import React from 'react'
// import './ImageGenerator.css'
// import defaultImage from '../assets/default_image.svg'

// const ImageGenerator = () => {

//   const [imageUrl, setImageUrl] = React.useState('/');
//   let inputRef = React.useRef(null);
// const generateImage = async () => {
//   if(inputRef.current.value===""){
//     alert('Please describe your image')

//   }const response = await fetch(
//     "https://api.openai.com/v1/images/generations",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer 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",
//         "user-agent": "Chrome",
//     },
//     body: JSON.stringify({
//       prompt: `${inputRef.current.value}`,
//       n:1,
//       size:"512x512",
//   }
//   )
// });
// let data = await response.json();
// let data_array = data.data;
// setImageUrl(data_array[0].url);
// }

//   return (
//     <div className='ai-image-generator'>
//     <div className='header'>Ai image <span>generator</span></div>
//      <div className='img-loading'>
//       <div className='image'><img src={imageUrl==="/"?defaultImage:imageUrl} alt=""/></div>
//      </div>
//      <div className='search-box'>
//       <input type='text' ref={inputRef} className='search-input' placeholder='describe your image'/>
//       <div className='generate-btn' onClick={()=>{generateImage()}}>Generate</div>
//      </div>

//     </div>
//   )
// }

// export default ImageGenerator

import React, { useState } from 'react';
import './ImageGenerator.css';
import defaultImage from '../assets/default_image.svg';

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState('/');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = React.useRef(null);

  const generateImage = async () => {
    if (inputRef.current.value === '') {
      alert('Please describe your image');
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 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",
            "user-agent": "Chrome",
          },
          body: JSON.stringify({
            prompt: `${inputRef.current.value}`,
            n:1,
            size:"512x512",
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      const imageUrl = data?.data?.[0]?.url;

      if (!imageUrl) {
        throw new Error('Image URL not found in response');
      }

      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className='ai-image-generator'>
      <div className='header'>Ai image <span>generator</span></div>
      <div className='img-loading'>
        <div className='image'>
          <img src={imageUrl === '/' ? defaultImage : imageUrl} alt=""/>
        </div>
        {isLoading && <div className="loading-bar"></div>}
      </div>
      <div className='search-box'>
        <input type='text' ref={inputRef} className='search-input' placeholder='describe your image'/>
        <div className='generate-btn' onClick={generateImage}>Generate</div>
      </div>
    </div>
  );
}

export default ImageGenerator;

