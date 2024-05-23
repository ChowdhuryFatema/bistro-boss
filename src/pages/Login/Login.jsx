import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from '../../assets/others/authentication2.png';
import { useForm } from "react-hook-form"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Swal from "sweetalert2";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Login = () => {

    const axiosPublic = useAxiosPublic();
    const [disabled, setDisAbled] = useState(true)

    const [showPassword, setShowPassword] = useState(false)
    const { signInUser, googleLogin, gitHubLogin, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || '/';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, e) => {

        const { email, password } = data;
        signInUser(email, password)
            .then(result => {
                console.log(result)
                navigate(from)
                Swal.fire({
                    text: "User Login Successfully!",
                    icon: "success"
                });
                e.target.reset()

            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
            })

    }

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleSocialLogin = socialProvider => {
        socialProvider()
            .then(result => {
                console.log(result)
                navigate(location?.state || '/')

                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                }

                axiosPublic.post('/users', userInfo)
                    .then(data => {
                        console.log(data.data);
                    })

            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleCaptcha = e => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value) == true) {
            setDisAbled(false)
        } else {
            setDisAbled(true)
        }


    }

    return (
        <div className="signIn min-h-screen">
            <div className="max-w-5xl mx-auto px-5">
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <div className="grid grid-cols-1 md:grid-cols-2 dark:bg-gray-800 items-center shadow-xl">

                        <div>
                            <img src={loginImg} alt="" />
                        </div>

                        <div className=" w-full space-y-3 dark:bg-gray-800 p-8">
                            <div className="mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold heading relative logo text-center">Login</h2>
                            </div>


                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                                <div>
                                    <label className="px-2 rounded-md bg-white py-3 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                        <input type="email" className="grow outline-none bg-transparent" placeholder="Email"  {...register("email", { required: true })} />


                                    </label>
                                    {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                                </div>
                                <div>
                                    <label className="px-2 rounded-md relative bg-white py-3  flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                        < input type={showPassword ? 'text' : 'password'} className="grow outline-none bg-transparent" placeholder="password"  {...register("password", { required: true })} />


                                        <p
                                            onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">

                                            {showPassword ?
                                                <LuEye size={20} /> :
                                                <LuEyeOff size={20} />}
                                        </p>

                                    </label>
                                    {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
                                </div>

                                <div>
                                    <label className="space-y-3">

                                        <input onBlur={handleCaptcha} type="text" name="captcha" className="grow outline-none bg-transparent bg-white px-2 rounded-md py-3 w-full" placeholder="Type the captcha" />
                                        <LoadCanvasTemplate />
                                    </label>
                                </div>


                                <button disabled={disabled} type="submit" className="btn w-full text-white text-center bg-[#D1A054B3] font-bold text-lg">
                                    {
                                        loading ?
                                            <TbFidgetSpinner size={24} className="animate-spin" /> :
                                            'Sign in'
                                    }
                                </button>
                            </form>
                            <div className="flex items-center w-full my-4">
                                <hr className="w-full dark:text-gray-600" />
                                <p className="px-3 dark:text-gray-600">OR</p>
                                <hr className="w-full dark:text-gray-600" />
                            </div>
                            <div className="flex justify-center space-x-4">
                                <button onClick={() => handleSocialLogin(googleLogin)} aria-label="Log in with Google" className="p-3 rounded-full border-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                    </svg>
                                </button>
                                <button onClick={() => handleSocialLogin(gitHubLogin)} aria-label="Log in with GitHub" className="p-3 rounded-full border-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                                    </svg>
                                </button>
                            </div>
                            <p className="text-xs text-center sm:px-6 dark:text-gray-600">Do not have an account ?
                                <Link to="/signUp" rel="noopener noreferrer" className="underline dark:text-gray-800 text-blue-500 font-semibold"> Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;