import React, { useEffect, useState } from 'react';
import { Card, FloatingLabel, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useGetToken from '../../../hooks/useGetToken';
import Loading from '../../Shared/Loading/Loading';
import SocialLogin from '../SocialLogin/SocialLogin';
import './Login.css'

const Login = () => {
    let location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [email, setEmail] = useState('');

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [token] = useGetToken(user);

    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(
        auth
    );

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, navigate, from])

    if (loading || sending) {
        return <Loading></Loading>
    }

    const onSubmit = async (data) => {
        const password = data.password;
        await signInWithEmailAndPassword(email, password);
    }

    const handlePassReset = async () => {
        await sendPasswordResetEmail(email);
        toast.success(`Password Reset Email sent to ${email}`);

    }

    return (
        <div className='shadow mb-5 bg-white rounded mx-auto text-center mt-5 half-container'>
            <Card>
                <Card.Body>
                    <Card.Title><h2 className='mb-4'>Login</h2></Card.Title>
                    <form onSubmit={handleSubmit(onSubmit)} className='customInput'>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3 "
                        >
                            <Form.Control type="email" className='' placeholder="name@example.com" {...register("email", {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: 'Valid email is required'
                                },
                                onBlur: (e) => setEmail(e.target.value)
                            })} />
                        </FloatingLabel>
                        {errors?.email && <p className='text-danger'><small>{errors?.email?.message}</small></p>}
                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3 ">
                            <Form.Control type="password" className='' placeholder="Password" {...register("password", {
                                required: 'Password is required'
                            })} />
                        </FloatingLabel>
                        {errors?.password && <p className='text-danger'><small>{errors?.password?.message}</small></p>}
                        <p className='text-danger my-2'>{error?.message || resetError?.message}</p>
                        {
                            loading ? <Loading></Loading> : <input className='submit-btn mt-2 btn btn-outline-dark py-2' type="submit" value="Sign In" />
                        }
                        <small className='d-flex align-items-center justify-content-center mt-3'>Forgot Password?<span onClick={handleSubmit(handlePassReset)} type="submit" class="ms-1 text-primary">Click to reset Password</span></small>
                    </form>
                    <p className='mt-3'>
                        <small>New to Gamers Point? <Link className='text-primary text-decoration-none' to='/register'>Register</Link></small>
                    </p>



                    <div className='divider mx-auto my-5'><span>or</span></div>
                    <SocialLogin from={from}></SocialLogin>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;