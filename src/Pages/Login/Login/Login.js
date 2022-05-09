import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import PassLogin from '../PassLogin/PassLogin';

const Login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(email, password);

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