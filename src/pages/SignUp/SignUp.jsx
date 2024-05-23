import { Link, useNavigate } from "react-router-dom";
import signUpImg from '../../assets/others/authentication2.png';
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const SignUp = () => {

    const axiosPublic = useAxiosPublic();
    const [showPassword, setShowPassword] = useState(false)
    const {
        createUser,
        logOutUser,
        googleLogin,
        gitHubLogin,
        updateUserProfile,
    } = useContext(AuthContext);

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, e) => {

        const { name, email, photo, password } = data;


        createUser(email, password)
            .then(result => {
                console.log(result)

                logOutUser()

                const userInfo = {
                    name,
                    photo,
                    email,
                }
                axiosPublic.post('/users', userInfo)
                    .then(data => {
                        if (data.data.insertedId) {
                            navigate('/login')
                            Swal.fire({
                                text: "User Created Successfully!",
                                icon: "success"
                            });
                            e.target.reset()
                            updateUserProfile(name, photo)
                        }
                    })


            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
            })

    }

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

    return (
        <div className="signUp min-h-screen">
            <div className="max-w-6xl mx-auto px-5">
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center shadow-lg">
                        <div className="p-10" >
                            <div className="mb-4">
                                <div className="mb-10">
                                    <h2 className="text-3xl md:text-4xl font-bold heading relative logo text-center">Sign Up</h2>
                                </div>
                            </div>
                            {/* sign up form  */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="space-y-4">
                                    <input type="text" name="name" placeholder="Name" className="bg-white px-2 rounded-md py-3 outline-none w-full bg-transparent" {...register("name", { required: true })} />
                                    {errors.name && <span className="text-red-500 text-sm">Name is required</span>}

                                    <input type="email" name="email" placeholder="Email" className="bg-white px-2 rounded-md1,91)] py-3 outline-none w-full bg-transparent" {...register("email", { required: true })} />

                                    {errors.email && <span className="text-red-500 text-sm">Email is required</span>}

                                    <input type="url" name="photo" placeholder="Photo URL" className="bg-white px-2 rounded-md py-3 outline-none w-full bg-transparent" {...register("photo", { required: true })} />
                                    {errors.photo && <span className="text-red-500 text-sm">Photo URL is required</span>}

                                    <div className="relative">
                                        <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" className="bg-white px-2 rounded-md py-3 outline-none w-full bg-transparent" {...register("password", {
                                            required: true,
                                            maxLength: 20,
                                            minLength: 6
                                        })} />

                                        <p
                                            onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2">

                                            {showPassword ?
                                                <LuEye size={20} /> :
                                                <LuEyeOff size={20} />}
                                        </p>
                                    </div>

                                    {errors.password?.type === "required" && (
                                        <p className="text-red-500 text-sm">Password is required</p>
                                    )}
                                    {errors.password?.type === "minLength" && (
                                        <p className="text-red-500 text-sm">Password must be 6 character</p>
                                    )}
                                    {errors.password?.type === "maxLength" && (
                                        <p className="text-red-500 text-sm">Password must be 20 character</p>
                                    )}

                                    <div>
                                        <input type="checkbox" name="" id="" />

                                        <span className="ml-2 text-sm">I agree the Terms and Conditions</span>
                                        <div className="pt-4">
                                        </div>
                                        <button type="submit" className="btn w-full text-white text-center bg-[#D1A054B3] font-bold text-lg">Sign Up</button>
                                    </div>
                                    <p className="text-center text-sm">Already have an account?
                                        <Link to="/login" className="underline font-semibold text-blue-500"> Sign In</Link>
                                    </p>
                                </div>
                            </form>
                            {/* social btn  */}
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
                        </div>
                        <div>
                            <img src={signUpImg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SignUp;