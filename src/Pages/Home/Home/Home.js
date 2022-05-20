import React from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../../Shared/Products/Products';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Banner></Banner>
            <div className='d-flex flex-column align-items-center'>
                <Products></Products>
                <button onClick={() => navigate('/products/all')} className='btn btn-outline-dark my-4 mx-auto'>Show All</button>
                <button onClick={() => navigate('/manageProducts')} className='btn btn-outline-dark mb-4 mx-auto'>Manage Inventory</button>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;