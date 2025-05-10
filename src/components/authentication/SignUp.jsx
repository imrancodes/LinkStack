import { useForm } from 'react-hook-form';
import CenterCard from '../CommonComponents/CenterCard';
import Logo from '../../assets/logo.png';
import Input from '../CommonComponents/Input';
import Button from '../CommonComponents/Button';
import googleIcon from '../../assets/google.png';
import { Link } from 'react-router-dom';
import { app } from '../../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthWithGoogle } from '../CommonComponents/SignInWithGoogle';

const auth = getAuth(app);

const SignUp = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const createUser = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            await updateProfile(userCredential.user, {displayName: data.name})

            toast.success(
                'Account created successfully. Redirecting to your dashboard...',
                { autoClose: 1000 }
            );

            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            let errorMessage = 'Something went wrong!';

            if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid Email! Please enter a valid email.';
            } else if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already in use!';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Weak password! Use at least 6 characters.';
            }

            toast.error(errorMessage, { autoClose: 3000 });
        }
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                theme="colored"
            />
            <CenterCard className={`max-[650px]:w-[80%] max-[500px]:w-[90%]`}>
                <div className="flex gap-2 items-center justify-center">
                    <img src={Logo} alt="Logo" className="size-14" />
                    <h1 className="text-2xl font-semibold">LinkStack</h1>
                </div>
                <div className="bg-[#191919d4] p-10 rounded-lg mt-5">
                    <h1 className="text-[#633CFF] text-4xl pb-2">SignUp</h1>
                    <p className="text-[13px] pb-2">
                        Hey, enter your details to create a new account!
                    </p>
                    <div>
                        <form>
                            <Input
                                label="Name"
                                type="text"
                                placeholder="Enter your name"
                                classname={`${
                                    errors.name
                                        ? 'border-red-500'
                                        : 'border-gray-400'
                                }`}
                                {...register('name', {
                                    required: 'Name is required',
                                })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-[14px] mb-1">
                                    {errors.name.message}
                                </p>
                            )}
                            <Input
                                label="Email"
                                type="email"
                                placeholder="user@example.com"
                                classname={`${
                                    errors.email
                                        ? 'border-red-500'
                                        : 'border-gray-400'
                                }`}
                                {...register('email', {
                                    required: 'Email is required',
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-[14px] mb-1">
                                    {errors.email.message}
                                </p>
                            )}
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                classname={`${
                                    errors.password
                                        ? 'border-red-500'
                                        : 'border-gray-400'
                                }`}
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-[14px] mb-1">
                                    {errors.password.message}
                                </p>
                            )}
                            <Button
                                type="submit"
                                className="bg-[#633CFF] mt-3 py-2 text-white w-full mb-2"
                                onClick={handleSubmit(createUser)}>
                                SignUp
                            </Button>
                        </form>

                        <p className="text-[13px] dark:text-white">
                            Already have an account?{' '}
                            <Link to={'/login'} className="text-[#633CFF]">
                                Login Now
                            </Link>
                        </p>
                        <div className="flex items-center my-2">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <span className="px-3 text-gray-500 text-sm">
                                OR
                            </span>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>
                        <Button
                            className="border bg-white py-2 flex items-center justify-center gap-5 w-full text-black"
                            onClick={(e) => AuthWithGoogle(e, navigate)}>
                            <img className="size-7 " src={googleIcon} alt="" />
                            Login with Google
                        </Button>
                    </div>
                </div>
            </CenterCard>
        </>
    );
};

export default SignUp;
