import React, { useRef, useState } from 'react'
import './Artify.css';
import default_image from '../Assets/default_image.svg'

function Artify() {

    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);
    const imageGenerator = async () => {
        if (inputRef.current.value==="") {
            return 0;
        }
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: "Bearer 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",
                    "User-Agent":"Chrome",
                },
                body: JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n:1, size:"512x512",
                }),
            }
        );
    }

  return (
    <div className='artify'>
        <div className="header">
            <span>Artify</span>, AI image generator
        </div>
        <div className="img-loading">
            <div className="image">
                <img src={image_url==="/"?default_image:image_url} alt="" />
            </div>
        </div>
        <div className="search-box">
            <input type="text" ref={inputRef} className='search-input' placeholder='What you want to see ?'/>
            <div className="generate-btn" onClick={() => {imageGenerator()}}>Generate</div>
        </div>

    </div>
  )
}

export default Artify