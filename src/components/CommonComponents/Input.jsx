import { useId } from 'react';

const Input = ({
    label,
    value,
    type = 'text',
    classname = '',
    ...props
}) => {
    const id = useId();

    return (
        <div>
            {label && <label className='flex dark:text-white text-[14px]' htmlFor={id}>{label}</label>}
            <input
                type={type}
                value={value}
                {...props}
                className={`${classname} pr-4 pl-2 py-2 outline-0 border border-gray-400 w-full rounded my-2 dark:text-white focus:border focus:border-[#633CFF]`}
                id={id}
            />
        </div>
    );
};

export default Input;
