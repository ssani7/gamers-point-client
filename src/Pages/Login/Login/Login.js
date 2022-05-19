import React, { useEffect } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import SocialLogin from '../SocialLogin/SocialLogin';
import './Login.css'

const Login = () => {
    let location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, navigate, from])

    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;

        await signInWithEmailAndPassword(email, password);
        navigate(from, { replace: true });
    }
    return (
        <div className='container mx-auto text-center mt-5'>
            <h2 className='mb-4'>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='customInput'>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3 "
                >
                    <Form.Control type="email" className='' placeholder="name@example.com" {...register("email", {
                        required: 'Email is required'
                    })} />
                </FloatingLabel>
                {errors?.email && <p className='text-danger'><small>{errors?.email?.message}</small></p>}
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 ">
                    <Form.Control type="password" className='' placeholder="Password" {...register("password", {
                        required: 'Password is required'
                    })} />
                </FloatingLabel>
                {errors?.password && <p className='text-danger'><small>{errors?.password?.message}</small></p>}
                {
                    loading ? <Loading></Loading> : <input className='submit-btn mt-3 btn btn-outline-dark' type="submit" value="Sign In" />
                }
            </form>
            <p className='mt-3'>New to Gamers Point? <Link to='/register'>Register</Link></p>
            <p className='text-danger mt-2'>{error?.message}</p>
            <div className='divider w-50 mx-auto'><span>or</span></div>
            <SocialLogin from={from}></SocialLogin>
        </div>
    );
};

export default Login;