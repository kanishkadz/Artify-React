import React from 'react'
import './Artify.css';
import default_image from '../Assets/default_image.svg'

function Artify() {
  return (
    <div className='artify'>
        <div className="header">
            <span>Artify</span>, AI image generator
        </div>
        <div className="img-loading">
            <div className="image">
                <img src={default_image} alt="" />
            </div>
        </div>

    </div>
  )
}

export default Artify