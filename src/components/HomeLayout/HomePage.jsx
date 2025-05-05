import React from 'react';
import Header from './Header';
import MobilePreview from './MobilePreview';
import Button from '../CommonComponents/Button';
import Item from '../../assets/item2.png';
import Links from './Links';


const HomePage = () => {
  return (
    <>
      <Header />
      <div className='flex gap-8 '>
        <MobilePreview />
        <div className='bg-[#191919d4] w-[70%] rounded-lg mr-4'>
          <div className='px-8 py-4'>
            <h1 className='text-3xl font-semibold mb-3'>Customize your links</h1>
            <p className='text-lg mb-8'>Add/edit/remove links below and then share all your profiles with the world!</p>
            <Button className='w-full border border-[#643CFF] text-[#643CFF] py-3 rounded-lg hover:bg-[#633cff26]'>+ Add a new Link</Button>
          </div>
          <div className='max-h-[430px] mx-8 my-4 links flex flex-col gap-4 overflow-y-auto scrollbar-hide'>
            <Links/>
            <Links/>
            <Links/>
          </div>
          <div className='bg-black rounded-lg p-4 mx-8 my-4 flex flex-col items-center justify-center hidden'>
            <img src={Item} alt="" className='w-[250px] h-[161px] mt-4' />
            <h1 className='text-3xl mt-8 mb-6'>Let's get you started</h1>
            <p className='text-md pb-20 text-center'>Click the button above to add your first link. <br /> You can edit or remove it anytime.</p>
          </div>
          <div className='bg-black h-1' />
          <div className='flex justify-end'>
            <Button className='bg-[#643CFF] px-6 py-2 mt-6 mr-8 hover:bg-[#633cffe2]'>Save</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;