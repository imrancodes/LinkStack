import React from 'react';
import { useForm } from 'react-hook-form';
import CenterCard from '../CommonComponents/CenterCard';
import Logo from '../../assets/logo.png';
import Input from '../CommonComponents/Input';
import Button from '../CommonComponents/Button';
import googleIcon from '../../assets/google.png';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase';
import { toast, ToastContainer } from 'react-toastify';
import { AuthWithGoogle } from '../CommonComponents/SignInWithGoogle';

const auth = getAuth(app);

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const logInUser = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);

            toast.success(
                'Login successful. Redirecting to your dashboard...',
                { autoClose: 1000 }
            );

            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            switch (err.code) {
                case 'auth/invalid-email':
                    toast.error(
                        'Invalid email format. Please check and try again.'
                    );
                    break;
                case 'auth/user-not-found':
                    toast.error(
                        'No account found with this email. Sign up instead.'
                    );
                    break;
                case 'auth/wrong-password':
                    toast.error(
                        'Incorrect password. Try again or reset your password.'
                    );
                    break;
                case 'auth/too-many-requests':
                    toast.error(
                        'Too many failed login attempts. Try again later.'
                    );
                    break;
                case 'auth/network-request-failed':
                    toast.error(
                        'Network error! Please check your internet connection.'
                    );
                    break;
                case 'auth/invalid-credential':
                    toast.error('Wrong email or password.');
                    break;
                default:
                    toast.error('Something went wrong! Please try again.');
                    console.log(err.code);
            }
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
                    <h1 className="text-[#633CFF] text-4xl pb-2">Login</h1>
                    <p className="text-[13px] pb-2">
                        Hey enter your details to login to your account!
                    </p>
                    <div>
                        <form>
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
                                onClick={handleSubmit(logInUser)}>
                                Login
                            </Button>
                        </form>

                        <p className="text-[13px] dark:text-white">
                            Don&apos;t have an account?{' '}
                            <Link to={'/signup'} className="text-[#633CFF]">
                                Signup Now
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

export default Login;
