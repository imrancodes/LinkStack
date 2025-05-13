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
import profile from '../../assets/profile.webp';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
} from 'firebase/firestore';


export const previewFunctionality = (auth, db, setName, setEmail, setNumber, setImageUrl, setLinks) => {

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
};

export const getBrandDetails = (value) => {
    switch (value) {
        case 'github':
            return { icon: <FaGithub size={18} />, color: '#181717' };
        case 'linkedin':
            return { icon: <FaLinkedin size={18} />, color: '#0A66C2' };
        case 'portfolio':
            return { icon: <IoGlobeOutline size={18} />, color: '#2D395D' };
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
