import React from 'react';
import Header from './Header';
import MobilePreview from './MobilePreview';
import Button from '../CommonComponents/Button';
import { CiImageOn } from "react-icons/ci";


const ProfileDetail = () => {
    return (
        <>
            <Header />
            <div className="flex gap-8">
                <MobilePreview />
                <div className="bg-[#191919d4] w-[70%] rounded-lg mr-4">
                    <div className="px-8 py-4">
                        <h1 className="text-3xl font-semibold mb-3">
                            Profile Details
                        </h1>
                        <p className="text-lg mb-8">
                            Add your details to create a personal touch to your
                            profile.
                        </p>
                    </div>
                    <div className='flex items-center justify-between bg-black rounded-lg p-4 mx-8 my-4'>
                        <h1>Profile picture
                        </h1>
                        <div className='flex items-center gap-4'>
                            <Button  className='flex flex-col items-center justify-center text-[#633CFF] bg-[#633cff36] px-8 py-14 rounded-lg my-2 gap-1 font-semibold'>
                                <CiImageOn className='text-4xl'/>
                                <p className='text-lg'>+ Upload Image</p>
                            </Button>
                            <p className='text-[12px] font-light'>Image must be below <br /> 1024x1024px. Use PNG <br /> or JPG format.</p>
                        </div>
                    </div>
                    <div>
                        {/* Name, Email and phone number field */}
                    </div>
                    <div className="bg-black h-1" />
                    <div className="flex justify-end">
                        <Button
                            // onClick={handleDataSave}
                            className={`bg-[#643CFF] px-6 py-2 mt-6 mr-8 disabled:bg-[#977ff8] disabled:cursor-not-allowed hover:bg-[#633cffe2]`}
                            type="submit"
                            // disabled={links.length === 0}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileDetail;
