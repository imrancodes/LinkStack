import { useEffect, useState } from 'react';
import Header from './Header';
import MobilePreview from './MobilePreview';
import Button from '../CommonComponents/Button';
import { CiImageOn } from 'react-icons/ci';
import profile from '../../assets/profile.webp';
import toast, { Toaster } from 'react-hot-toast';
import Input from '../CommonComponents/Input';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase';

const auth = getAuth(app);

const ProfileDetail = () => {
    const [imageUrl, setImageUrl] = useState(profile);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setEmail(user.email || '')
            setName(user.displayName || '')
        }
    });

    return () => unsubscribe();
}, []);


    const handleImagePreview = (e) => {
        const file = e.target.files[0];

        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            toast.error('Please upload an image in PNG, JPG, or JPEG format.');
            return;
        }

        const maxSize = 1024 * 1024;
        if (maxSize < file.size) {
            toast.error('Image must be below 1MB (1024x1024px).');
            return;
        }

        setImageUrl(URL.createObjectURL(file));
    };

    return (
        <>
            <Toaster />
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
                    <form>
                        <div className="flex items-center justify-between bg-black rounded-lg p-4 mx-8 my-4">
                            <h1 className="font-semibold">Profile picture</h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-4 relative group">
                                    <img
                                        src={imageUrl}
                                        className="justify-center w-48 h-48 rounded-lg my-2"
                                    />
                                    <label
                                        htmlFor="image"
                                        className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center justify-center text-lg font-semibold opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-lg cursor-pointer flex-col ">
                                        <CiImageOn className="text-4xl" />
                                        <p>
                                            {imageUrl === profile
                                                ? '+ Upload'
                                                : 'Change'}{' '}
                                            Image
                                        </p>
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImagePreview}
                                    />
                                </div>
                                <p className="text-[12px] font-light">
                                    Image must be below <br /> 1024x1024px. Use
                                    PNG <br />, JPG or JPEG format.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col bg-black rounded-lg p-4 mx-8 my-4">
                            <Input
                                label={'Full Name'}
                                placeholder={'Enter your full name'}
                                value={name}
                            />
                            <Input
                                label={'Phone Number'}
                                placeholder={'+91 (123)456-7890'}
                                type='number'
                            />
                            <Input
                                label={'Email Address'}
                                placeholder={'Enter your email address'}
                                value={email}
                            />
                        </div>
                        <div className="bg-black h-1" />
                        <div className="flex justify-end">
                            <Button
                                // onClick={handleDataSave}
                                className={`bg-[#643CFF] px-6 py-2 mt-6 mr-8 disabled:bg-[#977ff8] disabled:cursor-not-allowed hover:bg-[#633cffe2]`}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProfileDetail;
