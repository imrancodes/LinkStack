import React from 'react'
import MobilePreviewImage from '../../assets/mobile.png';

const MobilePreview = () => {
  return (
    <div className='bg-[#191919d4] py-16 ml-4 rounded-lg w-[30%] px-4 relative'>
        <img src={MobilePreviewImage} alt="phone" className='m-auto z-0 relative'/>
    </div>
  )
}

export default MobilePreview