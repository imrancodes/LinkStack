import React from 'react';

const CenterCard = ({ children, className }) => {
    return (
        <div
            className={`flex flex-col gap-3 absolute top-[50%] left-[50%] transform -translate-[50%] ${className}`}>
            {children}
        </div>
    );
};

export default CenterCard;
