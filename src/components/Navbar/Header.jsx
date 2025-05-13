import Logo from '../../assets/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { FaLink } from 'react-icons/fa6';
import { CgProfile } from "react-icons/cg";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase';

const auth = getAuth(app);

const Header = () => {
  const userId = auth.currentUser.uid

  return (
    <nav className='flex items-center justify-between bg-[#191919d4] mx-4 mt-6 min-[800px]:mb-8 mb-6 p-4 rounded-lg'>
        <div className="flex gap-2 items-center justify-center">
          <img src={Logo} alt="Logo" className="size-14 max-[800px]:size-10" />
          <h1 className="min-[800px]:text-2xl font-semibold max-[400px]:hidden">LinkStack</h1>
        </div>
        <div className='flex gap-6 text-lg font-semibold'>
          <NavLink className={({isActive}) => `flex gap-2 items-center justify-center rounded-lg ${isActive ? 'text-[#633CFF] bg-[#633cff36] px-4 py-3' : 'text-white bg-transparent px-0 py-0'}`}  to={'/'} title='links'>
            <FaLink className='text-xl' />
            <h1 className='max-[800px]:hidden'>Links</h1>
          </NavLink>
          <NavLink className={({isActive}) =>`flex gap-2 items-center justify-center rounded-lg ${isActive ? 'text-[#633CFF] bg-[#633cff36] px-4 py-3' : 'text-white bg-transparent px-0 py-0'} `} to={'/updateProfile'} title='profile'>
            <CgProfile className='text-xl' />
            <h1 className='max-[800px]:hidden'>Profile Details</h1>
          </NavLink>
        </div>
        <div className='flex'>
          <Link to={`/profile/${userId}`} className='px-5 py-3 border border-[#633CFF] rounded-lg font-semibold hover:bg-[#633cff26]'>
          <MdOutlineRemoveRedEye className='min-[800px]:hidden' />
          <p className='max-[800px]:hidden'>Preview</p>
          </Link>
        </div>
      </nav>
  )
}

export default Header