import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const Login = () => {
    let location = useLocation();
    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    if (user) {
        navigate(from, { replace: true });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        await signInWithEmailAndPassword(email, password);
        navigate(from, { replace: true });
    }
    return (
        <div className='w-50 mx-auto text-center mt-5'>
            <form onSubmit={handleSubmit}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com" name='email' />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" name='password' />
                </FloatingLabel>

                {
                    loading ? <Loading></Loading> : <input className='w-50 mt-3 btn btn-outline-dark' type="submit" value="Sign In" />
                }

            </form>
            <p className='mt-2'>Already have an account? <Link to='/login'>Log in</Link></p>
            <p className='text-danger mt-2'>{error?.message}</p>
        </div>
    );
};

export default Login;