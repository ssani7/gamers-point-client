import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <div className='d-flex justify-content-center align-items-center py-5 h-100'>
            <Spinner animation="border" className='m-3' />
            Please wait or try again a while
        </div>
    );
};

export default Loading;