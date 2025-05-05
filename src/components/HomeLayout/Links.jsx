import React, { useState } from 'react';
import { FaLink, FaStackOverflow } from 'react-icons/fa';
import { CgArrowLongRight } from 'react-icons/cg';
import Button from '../CommonComponents/Button';
import Input from '../CommonComponents/Input';
import { FaInstagram } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { TbBrandOnlyfans } from "react-icons/tb";
import {
  Github,
  Linkedin,
  Globe,
  Code2,
  Code,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Send,
} from 'lucide-react';

const Links = () => {
  const linkOptions = [
    { name: 'GitHub', value: 'github', icon: <Github size={18} /> },
    { name: 'LinkedIn', value: 'linkedin', icon: <Linkedin size={18} /> },
    { name: 'Portfolio', value: 'portfolio', icon: <Globe size={18} /> },
    { name: 'Dev.to', value: 'devto', icon: <Code2 size={18} /> },
    { name: 'Stack Overflow', value: 'stackoverflow', icon: <FaStackOverflow size={18} /> },
    { name: 'Hashnode', value: 'hashnode', icon: <Code size={18} /> },
    { name: 'Instagram', value: 'instagram', icon: <FaInstagram size={18} /> },
    { name: 'Twitter (X)', value: 'twitter', icon: <Twitter size={18} /> },
    { name: 'Facebook', value: 'facebook', icon: <Facebook size={18} /> },
    { name: 'YouTube', value: 'youtube', icon: <Youtube size={18} /> },
    { name: 'Snapchat', value: 'snapchat', icon: <FaSnapchat size={18} /> },
    { name: 'TikTok', value: 'tiktok', icon: <FaTiktok size={18} /> },
    { name: 'WhatsApp', value: 'whatsapp', icon: <FaWhatsapp size={18} /> },
    { name: 'Telegram', value: 'telegram', icon: <Send size={18} /> },
    { name: 'Pinterest', value: 'pinterest', icon: <FaPinterestP size={18} /> },
    { name: 'Only Fans', value: 'onlyfans', icon: <TbBrandOnlyfans size={18} /> },
  ];

  const [selected, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = linkOptions.find(opt => opt.value === selected);

  return (
    <div className="bg-black rounded-lg p-4">
      <div className="flex justify-between items-center text-gray-200 mb-4">
        <div className="flex gap-1 items-center">
          <CgArrowLongRight />
          <h1>Link #1</h1>
        </div>
        <Button>Remove</Button>
      </div>

      {/* Custom Dropdown */}
      <div className="relative mx-auto mt-5">
        <label className="block text-sm mb-2 text-white">Platform</label>

        <div
          className="w-full border border-gray-500 p-2 rounded bg-black text-white cursor-pointer flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? (
            <div className="flex gap-2 items-center">{selectedOption.icon}<span>{selectedOption.name}</span></div>
          ) : (
            <span className="text-gray-400">Choose a platform</span>
          )}
          <span className="ml-auto">&#9662;</span>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full bg-black border border-gray-600 mt-1 rounded shadow-lg max-h-60 overflow-y-auto">
            {linkOptions.map(option => (
              <div
                key={option.value}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 cursor-pointer"
                onClick={() => {
                  setSelected(option.value);
                  setIsOpen(false);
                }}
              >
                {option.icon}
                {option.name}
              </div>
            ))}
          </div>
        )}

        {/* Input Field */}
        <div className="relative mt-4">
          <Input
            label={'Link'}
            classname="pl-7.5"
            placeholder={'e.g. https://yourlink.com'}
          />
          <FaLink className="absolute top-[42px] left-[7px]" />
        </div>
      </div>
    </div>
  );
};

export default Links;
