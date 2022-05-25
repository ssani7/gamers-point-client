import React, { useEffect, useState } from 'react';
import { Card, FloatingLabel, Form } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import useGetToken from '../../../hooks/useGetToken';
import Loading from '../../Shared/Loading/Loading';
import SocialLogin from '../SocialLogin/SocialLogin';

const PassLogin = () => {
    let location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [password, setPassword] = useState('');

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth);

    const [token] = useGetToken(user);

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true })
            if (!user?.user?.emailVerified) {
                navigate('/manageProducts')
            }
        }
    }, [token, user, navigate, from])

    const onSubmit = async (data) => {
        const email = data.email;
        await createUserWithEmailAndPassword(email, password);
    }
    return (
        <div className='bg-white mx-auto text-center mt-5 half-container'>
            <Card className='py-5 p-md-5 shadow-lg border-0 rounded'>
                <Card.Body>
                    <Card.Title><h2 className='mb-4'>Sign Up</h2></Card.Title>
                    <form onSubmit={handleSubmit(onSubmit)} className='customInput'>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control type="email" placeholder="name@example.com" {...register("email", {
                                required: 'Email is required'
                            })} />
                        </FloatingLabel>
                        {errors?.email && <p className='text-danger'><small>{errors?.email?.message}</small></p>}
                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                            <Form.Control type="password" placeholder="Password" {...register("password", {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must contain 6 chatacters'
                                },
                                onBlur: (e) => setPassword(e.target.value)
                            })} />
                        </FloatingLabel>
                        {errors?.password && <p className='text-danger'><small>{errors?.password?.message}</small></p>}
                        <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
                            <Form.Control type="password" placeholder="Password" {...register("confirm", {
                                required: 'Password confirmation is required',
                                validate: value => value === password || 'Passwords do not match'
                            })} />
                        </FloatingLabel>
                        {errors?.confirm && <p className='text-danger'><small> {errors?.confirm?.message}</small></p>}
                        <p className='my-1'><small className='text-danger'>{error?.message}</small></p>
                        {
                            loading ? <Loading></Loading> : <input className='submit-btn mt-2 btn btn-outline-dark py-2' type="submit" value="Sign Up" />
                        }

                    </form>
                    <p className='mt-3'><small>Already have an account? <Link to='/login'>Log in</Link></small></p>
                    <div className='divider mx-auto my-5'><span>or</span></div>
                    <SocialLogin from={from}></SocialLogin>
                </Card.Body>
            </Card>



        </div>
    );
};

export default PassLogin;