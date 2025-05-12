import { useEffect, useState } from 'react';
import MobilePreviewImage from '../../assets/mobile.png';
import profile from '../../assets/profile.webp';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase';
import { FaArrowRight } from 'react-icons/fa6';
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
import { FaFreeCodeCamp } from 'react-icons/fa';
import { FaStackOverflow } from 'react-icons/fa';

const auth = getAuth(app);
const db = getFirestore(app);

const MobilePreview = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [imageUrl, setImageUrl] = useState(profile);
    const [links, setLinks] = useState([]);

    const getBrandDetails = (value) => {
        switch (value) {
            case 'github':
                return { icon: <FaGithub size={18} />, color: '#181717' }; // GitHub
            case 'linkedin':
                return { icon: <FaLinkedin size={18} />, color: '#0A66C2' }; // LinkedIn
            case 'portfolio':
                return { icon: <IoGlobeOutline size={18} />, color: '#000000' }; // Portfolio
            case 'devto':
                return { icon: <FaDev size={18} />, color: '#0A0A0A' }; // Dev.to
            case 'stackoverflow':
                return {
                    icon: <FaStackOverflow size={18} />,
                    color: '#F58025',
                }; // Stack Overflow
            case 'hashnode':
                return { icon: <FaHashnode size={18} />, color: '#2962FF' }; // Hashnode
            case 'freecodecamp':
                return { icon: <FaFreeCodeCamp size={18} />, color: '#006400' }; // FreeCodeCamp
            case 'instagram':
                return { icon: <FaInstagram size={18} />, color: '#E4405F' }; // Instagram
            case 'twitter':
                return { icon: <FaXTwitter size={18} />, color: '#1DA1F2' }; // Twitter (X)
            case 'facebook':
                return { icon: <FaFacebook size={18} />, color: '#1877F2' }; // Facebook
            case 'youtube':
                return { icon: <FaYoutube size={18} />, color: '#FF0000' }; // YouTube
            case 'snapchat':
                return { icon: <FaSnapchat size={18} />, color: '#FFFC00' }; // Snapchat
            case 'tiktok':
                return { icon: <FaTiktok size={18} />, color: '#010101' }; // TikTok
            case 'whatsapp':
                return { icon: <FaWhatsapp size={18} />, color: '#25D366' }; // WhatsApp
            case 'telegram':
                return {
                    icon: <RiTelegram2Fill size={18} />,
                    color: '#0088CC',
                }; // Telegram
            case 'pinterest':
                return { icon: <FaPinterestP size={18} />, color: '#E60023' };
            case 'onlyfans':
                return {
                    icon: <TbBrandOnlyfans size={18} />,
                    color: '#00AFF0',
                };
            default:
                return { icon: null, color: '#151515' };
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const profileRef = doc(db, 'profileDetail', user.uid);
                    const profileSnap = await getDoc(profileRef);

                    if (profileSnap.exists()) {
                        const profileData = profileSnap.data();
                        setName(profileData.name || '');
                        setEmail(profileData.email || user.email || '');
                        setNumber(profileData.phoneNo || '');
                        setImageUrl(profileData.image || profile);
                    }

                    const q = query(
                        collection(db, 'links'),
                        where('user', '==', user.uid)
                    );
                    const querySnapshot = await getDocs(q);
                    const LinksArray = querySnapshot.docs.map((doc) => ({
                        ...doc.data(),
                    }));
                    setLinks(LinksArray);
                } catch (err) {
                    console.error(err);
                }
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="bg-[#191919d4] rounded-lg w-[30%] ml-4 flex items-center justify-center">
            <div
                className="relative w-full h-full bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${MobilePreviewImage})`,
                    minHeight: '500px',
                }}>
                <div className="absolute top-92 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
                    <img
                        src={imageUrl}
                        className="size-24 border-4 border-[#643CFF] rounded-full"
                        alt="Profile"
                    />
                    {name ? (
                        <h1 className="mt-4 font-semibold text-xl break-all text-center">
                            {name}
                        </h1>
                    ) : (
                        <div className="bg-[#151515] w-38 h-6 rounded-lg mt-4"></div>
                    )}
                    {email ? (
                        <h1 className="mt-2 break-all text-center">{email}</h1>
                    ) : (
                        <div className="bg-[#151515] w-48 h-6 rounded-lg mt-2"></div>
                    )}
                    {number ? (
                        <h1 className="mt-3 mb-6">
                            +{number.slice(0, 2)} {number.slice(2)}
                        </h1>
                    ) : (
                        <div className="bg-[#151515] w-40 h-6 rounded-lg mt-3"></div>
                    )}
                    {Array.from({ length: 4 }).map((_, index) => {
                        const link = links[index];

                        if (link) {
                            const { icon, color } = getBrandDetails(
                                link.platform
                            );
                            const capitalizedName =
                                link.platform.charAt(0).toUpperCase() +
                                link.platform.slice(1);

                            return link.url ? (
                                <a
                                    href={link.url}
                                    target="_blank"
                                    key={link.id}
                                    className="flex items-center justify-around w-56 h-12 rounded-lg mt-4"
                                    style={{ backgroundColor: color }}>
                                    <div className="flex items-center gap-2">
                                        {icon}
                                        <h1>{capitalizedName}</h1>
                                    </div>
                                    <FaArrowRight />
                                </a>
                            ) : (
                                <div
                                    key={link.id}
                                    className="bg-[#151515] w-56 h-12 rounded-lg mt-4"></div>
                            );
                        }

                        // Render this div if the link is not available
                        return (
                            <div
                                key={index}
                                className="bg-[#151515] w-56 h-12 rounded-lg mt-4"></div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MobilePreview;
