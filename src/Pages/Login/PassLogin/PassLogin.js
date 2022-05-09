import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import auth from '../../../firebase.init';

const PassLogin = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.email.value)
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
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" name='password' />
                </FloatingLabel>
                <input className='w-50 mt-3 btn btn-outline-dark' type="submit" value="Sign In" />
            </form>
        </div>
    );
};

export default PassLogin;