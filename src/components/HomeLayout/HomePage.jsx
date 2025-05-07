import React, { useState } from 'react';
import Header from './Header';
import MobilePreview from './MobilePreview';
import Button from '../CommonComponents/Button';
import Item from '../../assets/item2.png';
import Links from './Links';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../../firebase.js';

const db = getFirestore(app);

const HomePage = () => {
    const [showComponent, setShowComponent] = useState(false);
    const [links, setLinks] = useState([]);
    const [errors, setErrors] = useState({ platform: false, url: false });

    const handleShowLinks = async () => {
        const newLink = {
            id: Date.now(),
            platform: '',
            url: '',
            icon: '',
        };
        setLinks((prev) => [...prev, newLink]);
        setShowComponent(true);
    };

    const handleRemoveLink = (id) => {
        const updatedLinks = links.filter((link) => link.id !== id);
        setLinks(updatedLinks);

        if (updatedLinks.length === 0) {
            setShowComponent(false);
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
                for (const link of links) {
                    const docRef = await addDoc(collection(db, 'links'), link);
                    console.log(`Document written with ID: ${docRef.id} for link:`, link);
                }
            } catch (e) {
                console.error('Error adding document: ', e);
            }
            console.log('Links:', links);
        }
        
    };

    return (
        <>
            <Header />
            <div className="flex gap-8 ">
                <MobilePreview />
                <div className="bg-[#191919d4] w-[70%] rounded-lg mr-4">
                    <div className="px-8 py-4">
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
                        className={`min-h-[430px] mx-8 my-4 links flex flex-col gap-4 overflow-y-auto scrollbar-hide ${
                            showComponent ? 'h-[430px]' : 'h-0'
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
                        className={`bg-black rounded-lg p-4 mx-8 my-4 flex flex-col items-center justify-center ${
                            showComponent ? 'hidden' : 'block'
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
                            className={`bg-[#643CFF] px-6 py-2 mt-6 mr-8 disabled:bg-[#977ff8] disabled:cursor-not-allowed hover:bg-[#633cffe2]`}
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
