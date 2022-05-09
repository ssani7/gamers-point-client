import React, { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const PassLogin = () => {
    const [noMatch, setNoMatch] = useState('')
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth)



    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirm = e.target.confirm.value;
        if (password === confirm) {
            createUserWithEmailAndPassword(email, password)
        } else {
            setNoMatch("Passwords do not match")
        }
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
                <FloatingLabel controlId="floatingPassword" label="Confirm Password">
                    <Form.Control type="password" placeholder="Password" name='confirm' />
                </FloatingLabel>
                {
                    loading ? <Loading></Loading> : <input className='w-50 mt-3 btn btn-outline-dark' type="submit" value="Sign In" />
                }

            </form>
            <p>Already have an account? <Link to='/login'>Log in</Link></p>
            <p className='text-danger'>{error?.message} {noMatch}</p>
        </div>
    );
};

export default PassLogin;