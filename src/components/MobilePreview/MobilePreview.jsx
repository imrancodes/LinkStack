import MobilePreviewImage from '../../assets/mobile.png';
import profile from '../../assets/profile.webp';

const MobilePreview = () => {
    return (
        <div className="bg-[#191919d4] rounded-lg w-[30%] ml-4 flex items-center justify-center">
            <div 
                className="relative w-full h-full bg-no-repeat bg-center"
                style={{
                    backgroundImage: `url(${MobilePreviewImage})`,
                    minHeight: '500px'
                }}
            >
                <div className="absolute top-42 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img 
                        src={profile} 
                        className="size-24 border-4 border-[#643CFF] rounded-full" 
                        alt="Profile" 
                    />
                    
                </div>
            </div>
        </div>
    );
};

export default MobilePreview;