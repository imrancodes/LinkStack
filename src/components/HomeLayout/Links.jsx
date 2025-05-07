import React, { useState } from 'react';
import { FaLink, FaStackOverflow } from 'react-icons/fa';
import { CgArrowLongRight } from 'react-icons/cg';
import Button from '../CommonComponents/Button';
import Input from '../CommonComponents/Input';
import { FaInstagram } from 'react-icons/fa';
import { FaSnapchat } from 'react-icons/fa6';
import { FaTiktok } from 'react-icons/fa6';
import { FaWhatsapp } from 'react-icons/fa';
import { FaPinterestP } from 'react-icons/fa';
import { TbBrandOnlyfans } from 'react-icons/tb';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaDev } from 'react-icons/fa';
import { IoGlobeOutline } from 'react-icons/io5';
import { FaHashnode } from 'react-icons/fa6';
import { FaXTwitter } from 'react-icons/fa6';
import { FaYoutube } from 'react-icons/fa6';
import { FaFacebook } from 'react-icons/fa';
import { RiTelegram2Fill } from 'react-icons/ri';

const Links = ({
    order,
    removeLink,
    id,
    updateLink,
    errors,
}) => {
    const linkOptions = [
        { name: 'GitHub', value: 'github', icon: <FaGithub size={18} /> },
        { name: 'LinkedIn', value: 'linkedin', icon: <FaLinkedin size={18} /> },
        {
            name: 'Portfolio',
            value: 'portfolio',
            icon: <IoGlobeOutline size={18} />,
        },
        { name: 'Dev.to', value: 'devto', icon: <FaDev size={18} /> },
        {
            name: 'Stack Overflow',
            value: 'stackoverflow',
            icon: <FaStackOverflow size={18} />,
        },
        { name: 'Hashnode', value: 'hashnode', icon: <FaHashnode size={18} /> },
        {
            name: 'Instagram',
            value: 'instagram',
            icon: <FaInstagram size={18} />,
        },
        {
            name: 'Twitter (X)',
            value: 'twitter',
            icon: <FaXTwitter size={18} />,
        },
        { name: 'Facebook', value: 'facebook', icon: <FaFacebook size={18} /> },
        { name: 'YouTube', value: 'youtube', icon: <FaYoutube size={18} /> },
        { name: 'Snapchat', value: 'snapchat', icon: <FaSnapchat size={18} /> },
        { name: 'TikTok', value: 'tiktok', icon: <FaTiktok size={18} /> },
        { name: 'WhatsApp', value: 'whatsapp', icon: <FaWhatsapp size={18} /> },
        {
            name: 'Telegram',
            value: 'telegram',
            icon: <RiTelegram2Fill size={18} />,
        },
        {
            name: 'Pinterest',
            value: 'pinterest',
            icon: <FaPinterestP size={18} />,
        },
        {
            name: 'Only Fans',
            value: 'onlyfans',
            icon: <TbBrandOnlyfans size={18} />,
        },
    ];

    const [selected, setSelected] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = linkOptions.find((opt) => opt.value === selected);

    return (
        <div className="bg-black rounded-lg p-4">
            <div className="flex justify-between items-center text-gray-200 mb-4">
                <div className="flex gap-1 items-center">
                    <CgArrowLongRight />
                    <h1>Link #{order}</h1>
                </div>
                <Button onClick={() => removeLink(id)}>Remove</Button>
            </div>

            <div className="relative mx-auto mt-5">
                <label className="block text-sm mb-2 text-white">
                    Platform
                </label>

                <div
                    className="w-full border border-gray-500 p-2 rounded bg-black text-white cursor-pointer flex justify-between items-center"
                    onClick={() => setIsOpen(!isOpen)}>
                    {selectedOption ? (
                        <div className="flex gap-2 items-center">
                            {selectedOption.icon}
                            <span>{selectedOption.name}</span>
                        </div>
                    ) : (
                        <span className="text-gray-400">Choose a platform</span>
                    )}
                    <span className="ml-auto">&#9662;</span>
                </div>
                {errors?.platform && (
                    <p className="text-red-500 text-sm mt-1">Platform is required</p>
                )}

                {isOpen && (
                    <div className="absolute z-10 w-full bg-black border border-gray-600 mt-1 rounded shadow-lg max-h-60 overflow-y-auto">
                        {linkOptions.map((option) => (
                            <div key={option.value || 'no-value'}>
                                <div
                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 cursor-pointer"
                                    onClick={() => {
                                        if (!option.value) return;
                                        setSelected(option.value);
                                        updateLink(
                                            id,
                                            'platform',
                                            option.value,
                                            option.icon.type.name
                                        );
                                        setIsOpen(false);
                                    }}>
                                    {option.icon}
                                    {option.name}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="relative mt-4">
                    <Input
                        label={'Link'}
                        classname="pl-7.5"
                        placeholder={'e.g. https://yourlink.com'}
                        // {...register('url', {
                        //     required: 'Link is required',
                        //     pattern: {
                        //         value: /^(ftp|http|https):\/\/[^ "]+$/,
                        //         message: 'Invalid URL format',
                        //     },
                        // })}
                        onChange={(e) => {
                            updateLink(id, 'url', e.target.value);
                        }}
                    />
                    {errors?.url && (
                        <p className="text-red-500 text-sm mt-1">
                        {errors.message || 'Invalid URL format'}
                    </p>
                    )}
                    <FaLink className="absolute top-[42px] left-[7px]" />
                </div>
            </div>
        </div>
    );
};

export default Links;
