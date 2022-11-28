import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useJwt from '../../Hooks/jwtHook/useJwt';


const Login = () => {
    const { LoginWithEmailPassword, providerLogin } = useContext(AuthContext)
    const [logError, setLogError] = useState('')
    const [newUserEmail, setNewUserEmail] = useState('')
    const [token] = useJwt(newUserEmail)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const { register, formState: { errors }, handleSubmit } = useForm()
    const googleProvider = new GoogleAuthProvider()

    if (token) {
        navigate(from, { replace: true })
    }



    const handleLogin = data => {
        setLogError('')
        LoginWithEmailPassword(data.email, data.password)
            .then(result => {
                setLogError('');
                toast.success('Login Successful');
                setNewUserEmail(data.email)
            })
            .catch(error => {
                console.error(error);
                setLogError(error.message)
            })
    }

    // Google Sign In======================
    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                storeUser(result.user.displayName, result.user.email, result.user.photoURL)
                toast.success('Login Successfull');
            })
            .catch(error => console.error(error))

    }
    const storeUser = (name, email, photo) => {
        const user = {
            name,
            email,
            photo,
            userRole: "Buyer",
            verified: false
        };

        fetch('https://final-server-one.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setNewUserEmail(email)
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            <Header></Header>
            <div className='hero min-h-screen bg-slate-100 px-5'>
                <div className='shadow-lg rounded-xl p-10 sm:w-full lg:w-1/3 bg-white'>
                    <p className='text-2xl font-bold text-center'>Login</p>
                    {/* Form */}
                    <form onSubmit={handleSubmit(handleLogin)} className='my-5'>
                        <div className='py-3'>
                            <input
                                {...register("email", { required: 'Email is required' })}
                                type="email" placeholder="email" className="input input-bordered w-full" />
                            {errors.email && <p className='text-right text-red-600 my-1 text-xs'>{errors.email?.message}</p>}
                        </div>
                        <div className='py-3'>
                            <input
                                {...register("password",
                                    {
                                        required: 'Passwrd is required',
                                        minLength: { value: 6, message: 'Minimum 6 characters required' }
                                    })}
                                type="password" placeholder="password" className="input input-bordered w-full" />
                            {errors.password && <p className='text-right text-red-600 my-1 text-xs'>{errors.password?.message}</p>}
                            <label>
                                <Link><small className='label-text-alt text-xs px-3'>Forgot Password?</small></Link>
                            </label>
                        </div>
                        {/* Firebase Error Message */}
                        {
                            logError && <p className='text-red-500 text-center my-2'>({logError})</p>
                        }

                        <input className='btn bg-slate-700 w-full py-3' type='submit' value='Login' />
                    </form>

                    <p className='text-center'>
                        New here?
                        <Link to='/register'><span className=' text-blue-600'> Create new Account</span></Link>
                    </p>
                    {/* Divider */}
                    <div className="divider">OR</div>

                    <button onClick={handleGoogleSignIn} className='btn btn-outline w-full mt-5'>Continue with Google</button>

                </div>
            </div>
        </>
    );
};

export default Login;