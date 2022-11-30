import React from 'react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import Header from '../../Components/Header/Header';
import useJwt from '../../Hooks/jwtHook/useJwt';
import axios from 'axios'


const Register = () => {
    const { RegisterWithEmailPassword, updateUserInfo } = useContext(AuthContext)
    const [regError, setRegError] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'
    const [newUserEmail, setNewUserEmail] = useState('')
    const [token] = useJwt(newUserEmail)

    if (token) {
        navigate(from, { replace: true });
    }

    const { register, formState: { errors }, handleSubmit } = useForm()

    const handleRegister = data => {
        console.log(data);
        setRegError('')
        RegisterWithEmailPassword(data.email, data.password)
            .then(result => {
                if (result.user) {
                    toast.success("You've been registered")
                }
                const userInfo = {
                    displayName: data.name,
                    photoURL: data.photoUrl
                }
                updateUserInfo(userInfo)
                    .then(() => {
                        toast.success('Profile info Updated')
                        storeUser(data.name, data.email, data.userRole, data.photoUrl)
                    })
                    .catch(error => console.error(error))
            })
            .catch(error => {
                console.error(error);
                setRegError(error.message)
            })
    }

    const storeUser = (name, email, userRole, photo) => {
        const user = {
            name,
            email,
            photo,
            userRole,
            verified: false
        };

        axios.put(`https://final-server-one.vercel.app/users/${email}`, user)
            .then(res => {
                toast.success('Stored', res)
                setNewUserEmail(email);
            })
            .catch(error => console.log(error))
    }



    return (
        <>
            <Header></Header>
            <div className='hero min-h-screen bg-slate-100 px-5'>
                <div className='shadow-lg rounded-xl p-10 sm:w-full lg:w-1/3 bg-white'>
                    <p className='text-2xl font-bold text-center'>Register</p>
                    {/* Form */}
                    <form onSubmit={handleSubmit(handleRegister)} className='my-5'>
                        <div className='py-3'>
                            <input
                                {...register("name", { required: 'Name is required' })}
                                type="text" placeholder="your name" className="input input-bordered w-full" />
                            {errors.name && <p className='text-right text-red-600 my-1 text-xs'>{errors.name?.message}</p>}
                        </div>
                        <div className='py-3'>
                            <input
                                {...register("photoUrl", { required: 'This is required' })}
                                type="url" placeholder="your photo url" className="input input-bordered w-full" />
                            {errors.photoUrl && <p className='text-right text-red-600 my-1 text-xs'>{errors.photoUrl?.message}</p>}
                        </div>
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
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Minimum 6 characters required' }
                                    })}
                                type="password" placeholder="password" className="input input-bordered w-full" />
                            {errors.password && <p className='text-right text-red-600 my-1 text-xs'>{errors.password?.message}</p>}
                        </div>
                        <div className='flex py-3'>
                            <select
                                {...register("userRole", { required: 'This Field is required' })}
                                className="select select-bordered w-full">
                                <option defaultValue={'buyer'}>Buyer</option>
                                <option value={'seller'}>Seller</option>
                            </select>
                            {errors.userRole && <p className='text-right text-red-600 my-1 text-xs'>{errors.userRole?.message}</p>}
                        </div>
                        {/* Firebase Error Message */}
                        {
                            regError && <p className='text-red-500 text-center my-2'>({regError})</p>
                        }
                        <input className='btn bg-slate-700 w-full py-3 mt-5' type='submit' value='Register' />
                    </form>

                    <p className='text-center'>
                        Already have an Account?
                        <Link to='/login'><span className=' text-blue-600'> Login here</span></Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;