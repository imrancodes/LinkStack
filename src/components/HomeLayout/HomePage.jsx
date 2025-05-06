import React, { useState } from 'react';
import Header from './Header';
import MobilePreview from './MobilePreview';
import Button from '../CommonComponents/Button';
import Item from '../../assets/item2.png';
import Links from './Links';

const HomePage = () => {
    const [showComponent, setShowComponent] = useState(false);
    const [links, setLinks] = useState([]);

    const handleShowLinks = () => {
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

    const handleUpdateLink = (id, field, value) => {
        const updated = links.map((link) => {
            return link.id === id ? { ...link, [field]: value } : link;
        });
        setLinks(updated);
    };

    const handleDataSave = () => {
      console.log(links);
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
