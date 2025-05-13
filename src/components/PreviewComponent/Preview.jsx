import { Link } from 'react-router-dom';
import Button from '../CommonComponents/Button';
import CenterCard from '../CommonComponents/CenterCard';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    where,
} from 'firebase/firestore';
import profile from '../../assets/profile.webp';
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
import toast, { Toaster } from 'react-hot-toast';

const auth = getAuth(app);
const db = getFirestore(app);

const Preview = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [imageUrl, setImageUrl] = useState(profile);
    const [links, setLinks] = useState([]);
    const [userId, setUserId] = useState('');

    const getBrandDetails = (value) => {
        switch (value) {
            case 'github':
                return { icon: <FaGithub size={18} />, color: '#181717' };
            case 'linkedin':
                return { icon: <FaLinkedin size={18} />, color: '#0A66C2' };
            case 'portfolio':
                return { icon: <IoGlobeOutline size={18} />, color: '#2D395D' };
            case 'devto':
                return { icon: <FaDev size={18} />, color: '#0A0A0A' };
            case 'stackoverflow':
                return {
                    icon: <FaStackOverflow size={18} />,
                    color: '#F58025',
                };
            case 'hashnode':
                return { icon: <FaHashnode size={18} />, color: '#2962FF' };
            case 'freecodecamp':
                return { icon: <FaFreeCodeCamp size={18} />, color: '#12122B' };
            case 'instagram':
                return { icon: <FaInstagram size={18} />, color: '#E4405F' };
            case 'twitter':
                return { icon: <FaXTwitter size={18} />, color: '#1DA1F2' };
            case 'facebook':
                return { icon: <FaFacebook size={18} />, color: '#1877F2' };
            case 'youtube':
                return { icon: <FaYoutube size={18} />, color: '#FF0000' };
            case 'snapchat':
                return { icon: <FaSnapchat size={18} />, color: '#FFFC00' };
            case 'tiktok':
                return { icon: <FaTiktok size={18} />, color: '#010101' };
            case 'whatsapp':
                return { icon: <FaWhatsapp size={18} />, color: '#25D366' };
            case 'telegram':
                return {
                    icon: <RiTelegram2Fill size={18} />,
                    color: '#0088CC',
                };
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
                setUserId(user.uid);
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

    const renderProfile = () => (
        <div className="min-[900px]:bg-[#151515] flex flex-col justify-center items-center rounded-xl min-[900px]:shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-10 min-[900px]:w-[400px] mx-auto max-[400px]:mx-6">
            <img
                src={imageUrl}
                className="size-24 border-4 border-[#643CFF] rounded-full"
                alt="Profile"
            />
            <h1 className="mt-4 font-semibold text-xl break-all text-center">
                {name}
            </h1>
            <h1 className="mt-2 break-all text-center">{email}</h1>
            {number ? (
                <h1 className="mt-3">
                    +{number.slice(0, 2)} {number.slice(2)}
                </h1>
            ) : null}
            <div className="mt-6">
                {links.map((link) => {
                    if (link) {
                        const { icon, color } = getBrandDetails(link.platform);
                        const capitalizedName =
                            link.platform.charAt(0).toUpperCase() +
                            link.platform.slice(1);

                        return (
                            <a
                                href={link.url}
                                target="_blank"
                                key={link.id}
                                className="flex items-center justify-between px-4 py-4 min-[400px]:w-70 w-60 rounded-lg mt-4"
                                style={{ backgroundColor: color }}>
                                <div className="flex items-center gap-2">
                                    {icon}
                                    <h1>{capitalizedName}</h1>
                                </div>
                                <FaArrowRight />
                            </a>
                        );
                    }
                })}
            </div>
        </div>
    );

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success('Link Copied');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Toaster />
            <div className="min-[900px]:bg-[#653AFE] min-[900px]:h-[50vh] pt-6 min-[900px]:rounded-b-2xl min-[900px]:m-1">
                {userId === auth.currentUser?.uid && (
                    <nav
                        className="flex items-center justify-between min-[900px]:bg-[#151515] mx-4 mb-8 min-[900px]:p-4 rounded-lg
            min-[900px]:shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                        <Link
                            to={'/'}
                            className="px-5 py-3 border border-[#653AFE] rounded-lg font-semibold hover:bg-[#633cff26]">
                            Back to Editor
                        </Link>
                        <Button
                            className="px-5 py-3 rounded-lg font-semibold bg-[#653AFE] hover:bg-[#633cffe2]"
                            onClick={handleCopyUrl}>
                            Copy Link
                        </Button>
                    </nav>
                )}
                {(links.length < 4 || links.length !== 0) ||
                links.length === 0 ? (
                    <CenterCard>{renderProfile()}</CenterCard>
                ) : (
                    renderProfile()
                )}
            </div>
        </>
    );
};

export default Preview;
