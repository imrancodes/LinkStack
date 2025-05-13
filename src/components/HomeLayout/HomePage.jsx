import { useEffect, useState } from 'react';
import Header from './../Navbar/Header.jsx';
import MobilePreview from '../MobilePreview/MobilePreview.jsx';
import Button from '../CommonComponents/Button';
import Item from '../../assets/item2.png';
import Links from './Links';
import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore';
import { app } from '../../firebase.js';
import toast, { Toaster } from 'react-hot-toast';

const db = getFirestore(app);

const HomePage = ({ user }) => {
    const [showComponent, setShowComponent] = useState(false);
    const [links, setLinks] = useState([]);
    const [errors, setErrors] = useState({ platform: false, url: false });

    const handleShowLinks = async () => {

        const docRef = await addDoc(collection(db, 'links'), {
            platform: '',
            url: '',
            icon: '',
            user: user.uid,
        });

        await updateDoc(doc(db, 'links', docRef.id), {
            id: docRef.id,
        });

        const newLink = {
            id: docRef.id,
            platform: '',
            url: '',
            icon: '',
            user: user.uid,
        };

        setLinks((prev) => [...prev, newLink]);
        setShowComponent(true);
    };

    const handleRemoveLink = async (id) => {
        try {
            await toast.promise(
                deleteDoc(doc(db, 'links', id)).then(() => {
                    setLinks((prev) => prev.filter((link) => link.id !== id));

                    if (links.length === 1) {
                        setShowComponent(false);
                    }
                }),
                {
                    loading: 'Removing Link...',
                    success: 'Link removed successfully!',
                    error: 'Something went wrong! Please try again.',
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdateLink = (id, field, value, icon) => {
        setLinks((prevLinks) =>
            prevLinks.map((link) => {
                if (link.id === id) {
                    if (field === 'platform') {
                        return {
                            ...link,
                            platform: value,
                            icon: icon,
                        };
                    }
                    return { ...link, [field]: value };
                }
                return link;
            })
        );
    };

    const getLinks = async () => {
        try {
            const q = query(
                collection(db, 'links'),
                where('user', '==', user.uid)
            );
            const querySnapshot = await getDocs(q);
            const LinksArray = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
            }));
            setLinks(LinksArray);
            setShowComponent(LinksArray.length > 0);
        } catch (err) {
            console.error('Error fetching notes:', err);
        }
    };

    useEffect(() => {
        getLinks();
    }, []);

    const handleDataSave = async () => {
        const newErrors = {};
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

        links.forEach((link) => {
            if (!link.platform) newErrors[link.id] = { platform: true };
            if (!link.url) {
                newErrors[link.id] = {
                    ...newErrors[link.id],
                    url: true,
                    message: 'URL is required',
                };
            } else if (!urlPattern.test(link.url)) {
                newErrors[link.id] = {
                    ...newErrors[link.id],
                    url: true,
                    message: 'Invalid URL format',
                };
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                await toast.promise(
                    Promise.all(
                        links.map((link) => {
                            const updateLinks = {
                                platform: link.platform,
                                url: link.url,
                                icon: link.icon,
                            };

                            return updateDoc(
                                doc(db, 'links', link.id),
                                updateLinks
                            );
                        })
                    ),
                    {
                        loading: 'Saving Links...',
                        success: <b>Links saved successfully!</b>,
                        error: <b>Something went wrong! Please try again.</b>,
                    }
                );
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            <Toaster />
            <Header />
            <div className="flex gap-8 ">
                <MobilePreview />
                <div className="bg-[#191919d4] max-[1000px]:w-full max-[1000px]:ml-4 max-[1200px]:w-[60%] w-[70%] rounded-lg mr-4 pb-6 mb-4">
                    <div className="min-[500px]:px-8 px-4 py-6">
                        <h1 className="text-3xl font-semibold mb-3">
                            Customize your links
                        </h1>
                        <p className="text-lg mb-8">
                            Add/edit/remove links below and then share all your
                            profiles with the world!
                        </p>
                        <Button
                            className="w-full border border-[#643CFF] text-[#643CFF] py-3 rounded-lg hover:bg-[#633cff26]"
                            onClick={handleShowLinks}>
                            + Add a new Link
                        </Button>
                    </div>
                    <div
                        className={`min-h-[430px] min-[500px]:mx-8 mx-4 my-4 links flex flex-col gap-4 overflow-y-auto scrollbar-hide ${showComponent ? 'h-[430px]' : 'h-0'
                            } ${showComponent ? 'block' : 'hidden'} `}>
                        {links.map((link, i) => (
                            <Links
                                order={i + 1}
                                key={link.id}
                                id={link.id}
                                removeLink={handleRemoveLink}
                                updateLink={handleUpdateLink}
                                platform={link.platform}
                                url={link.url}
                                errors={errors[link.id]}
                            />
                        ))}
                    </div>
                    <div
                        className={`bg-black rounded-lg p-4 min-[500px]:mx-8 mx-4 my-4 flex flex-col items-center justify-center ${showComponent ? 'hidden' : 'block'
                            }`}>
                        <img
                            src={Item}
                            alt=""
                            className="w-[250px] h-[161px] mt-4"
                        />
                        <h1 className="text-3xl mt-8 mb-6">
                            Let's get you started
                        </h1>
                        <p className="text-md pb-20 text-center">
                            Click the button above to add your first link.{' '}
                            <br /> You can edit or remove it anytime.
                        </p>
                    </div>
                    <div className="bg-black h-1" />
                    <div className="flex justify-end">
                        <Button
                            onClick={handleDataSave}
                            className={`bg-[#643CFF] px-6 py-2 mt-4 mr-8 disabled:bg-[#977ff8] hover:bg-[#633cffe2]`}
                            type="submit"
                            disabled={links.length === 0}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
