import axios from 'axios';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import Loading from '../Shared/Loading/Loading';
import Product from '../Shared/Product/Product';

const ManageProducts = () => {
    const [products, setProducts] = useProducts();
    const navigate = useNavigate();

    if (products?.length === 0) {
        return <Loading></Loading>
    }

    const deleteGpu = ([id, name]) => {
        const proceed = window.confirm(`Are you sure to delete "${name}"?`);
        if (proceed) {
            axios.delete(`https://sheltered-hollows-42967.herokuapp.com/gpu/${id}`,)
                .then(res => {
                    const newGpus = products.filter(product => product._id !== id);
                    setProducts(newGpus);
                })
        }
    }
    return (
        <div className='m-5'>
            <h2 className='boldPoppins text-center my-5'>Manage Inventory Products</h2>
            <div className=' d-flex'>
                <div className='w-75'>
                    <Row className='g-3'>
                        {
                            products.map(gpu => <Col key={gpu._id} md={4}>
                                <Product
                                    gpu={gpu}>
                                    {
                                        (<Button variant='outline-danger w-100'
                                            onClick={() => deleteGpu([gpu._id, gpu.name])}>Delete</Button>)
                                    }
                                </Product></Col>)
                        }
                    </Row>
                </div>
                <div className='w-25 text-center pt-4'>
                    <Button onClick={() => navigate('/addProducts')} className='w-100 ms-4' variant='outline-dark'>Add Items</Button>
                </div>
            </div>


        </div>
    );
};

export default ManageProducts;