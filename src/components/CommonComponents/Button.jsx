const Button = ({
    className = '',
    children,
    type = 'button',
    onClick,
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            {...props}
            className={`text-center cursor-pointer rounded ${className}`}>
            {children}
        </button>
    );
};

export default Button;