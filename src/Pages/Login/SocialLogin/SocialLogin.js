import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import google from '../../../Images/google.png'

const SocialLogin = ({ from }) => {
    const navigate = useNavigate();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    if (user) {
        navigate(from, { replace: true });
    }

    const handleGsignIn = async () => {
        await signInWithGoogle();
    }

    return (
        <div>
            <Button
                onClick={handleGsignIn}
                variant="outline-dark"
                className='submit-btn py-3 d-flex justify-content-center align-items-center mx-auto'>
                {loading
                    ? (<>
                        <Spinner animation="grow" className='me-4' /> Signing In Please Wait
                    </>)
                    :
                    (<>
                        <img src={google} alt="" srcSet="" className='me-3' />
                        Sign In with Google
                    </>)}
            </Button>
            <p className='text-danger mt-2'>{error?.message}</p>
        </div>
    );
};

export default SocialLogin;