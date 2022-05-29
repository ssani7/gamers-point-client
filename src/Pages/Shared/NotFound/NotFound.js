import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => {
    return (
        <section className="flex align-items-center justify-content-center p-5 bg-gray text-gray">
            <div className="container px-5 mx-auto my-4">
                <div className="text-center text-white">
                    <h1 className="mb-2 text-dark">
                        <span className="me-2">Error</span>404
                    </h1>
                    <h3 className="font-semibold">Sorry, we couldn't find this page.</h3>
                    <h3 className="mb-4 mb-8 dark:text-gray-400">But dont worry, you can find plenty of other things on our homepage.</h3>
                    <Link to='/home' className="px-3 py-2 text-white text-decoration-none rounded bg-primary">Back to homepage</Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;