import { useEffect, useState } from 'react';
import Header from './../Navbar/Header';
import MobilePreview from '../MobilePreview/MobilePreview';
import Button from '../CommonComponents/Button';
import { CiImageOn } from 'react-icons/ci';
import profile from '../../assets/profile.webp';
import toast, { Toaster } from 'react-hot-toast';
import Input from '../CommonComponents/Input';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase';
import {
    doc,
    getDoc,
    getFirestore,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import CenterCard from '../CommonComponents/CenterCard';

const auth = getAuth(app);
const db = getFirestore(app);

const ProfileDetail = () => {
    const [imageUrl, setImageUrl] = useState(profile);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    setEmail(user.email || '');
                    setName(user.displayName || '');

                    const profileRef = doc(db, 'profileDetail', user.uid);
                    const profileSnap = await getDoc(profileRef);

                    if (profileSnap.exists()) {
                        const profileData = profileSnap.data();
                        setName(profileData.name || '');
                        setEmail(profileData.email || user.email || '');
                        setNumber(profileData.phoneNo || '');
                        setImageUrl(profileData.image || profile);
                    } else {
                        await setDoc(profileRef, {
                            userId: user.uid,
                            image: profile,
                            name: user.displayName || '',
                            email: user.email || '',
                            phoneNo: '',
                        });
                    }
                } catch (error) {
                    console.error('Profile load error:', error);
                    toast.error('Failed to load profile data');
                } finally {
                    setLoading(false);
                }
            }
        });
        return () => unsubscribe();
    }, []);

    const handleImagePreview = async (e) => {
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

        if (!file) return;

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'LinkStack');
        data.append('cloud_name', 'djzti0nh3');

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/djzti0nh3/image/upload',
            {
                method: 'POST',
                body: data,
            }
        );

        const uploadImageUrl = await res.json();
        setImageUrl(uploadImageUrl.url);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const user = auth.currentUser;
            await updateDoc(doc(db, 'profileDetail', user.uid), {
                image: imageUrl,
                name: name,
                email: email,
                phoneNo: number,
            });
            toast.success('Profile updated successfully');
        } catch (error) {
            console.error('Update error:', error);
            toast.error('Failed to update profile');
        }
    };

    return (
        <>
            <Toaster />
            <Header />
            {loading ? (
                <CenterCard>
                    <div className="text-center">
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-[#643BFE]"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </CenterCard>
            ) : (
                <div className="flex gap-8">
                    <MobilePreview />
                    <div className="bg-[#191919d4] max-[1000px]:w-full max-[1000px]:ml-4 max-[1200px]:w-[60%] w-[70%] rounded-lg mr-4 pb-6 mb-4">
                        <div className="min-[500px]:mx-8 mx-4 pt-6">
                            <h1 className="text-3xl font-semibold mb-3">
                                Profile Details
                            </h1>
                            <p className="text-lg mb-8">
                                Add your details to create a personal touch to
                                your profile.
                            </p>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="flex items-center justify-between bg-black rounded-lg p-4 min-[500px]:mx-8 mx-4 my-4 max-[650px]:flex-col max-[650px]:items-start max-[650px]:justify-center  gap-y-4 ">
                                <h1 className="font-semibold">
                                    Profile picture
                                </h1>
                                <div className="flex items-center gap-4 max-[650px]:flex-col max-[650px]:items-start">
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
                                        Image must be below <br className='max-[650px]:hidden' /> 1024x1024px.
                                        Use PNG <br className='max-[650px]:hidden'/>, JPG or JPEG format.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col bg-black rounded-lg p-4 min-[500px]:mx-8 mx-4 my-4">
                                <Input
                                    label={'Full Name'}
                                    placeholder={'Enter your full name'}
                                    value={name}
                                    onValueChange={(value) => setName(value)}
                                />

                                <Input
                                    label={'Email Address'}
                                    placeholder={'Enter your email address'}
                                    value={email}
                                    onValueChange={(value) => setEmail(value)}
                                />
                                <Input
                                    label={'Phone Number'}
                                    placeholder={'+91 (123)456-7890'}
                                    type="number"
                                    value={number}
                                    onValueChange={(value) => setNumber(value)}
                                />
                            </div>
                            <div className="bg-black h-1" />
                            <div className="flex justify-end">
                                <Button
                                    className={`bg-[#643CFF] px-6 py-2 mt-4 mr-8 disabled:bg-[#977ff8] disabled:cursor-not-allowed hover:bg-[#633cffe2]`}
                                    type="submit">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileDetail;
