import axios from 'axios';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import Product from '../Shared/Product/Product';

const ManageProducts = () => {
    const [products, setProducts] = useProducts();
    const navigate = useNavigate();
    const deleteGpu = (id) => {
        axios.delete(`https://sheltered-hollows-42967.herokuapp.com/${id}`,)
            .then(res => {
                const newGpus = products.filter(product => product._id !== id);
                setProducts(newGpus);
            })

    }
    return (
        <div className='m-5 d-flex'>
            <div className='w-75'>
                <Row className='g-3'>
                    {
                        products.map(gpu => <Col md={4}>
                            <Product
                                key={gpu._id}
                                gpu={gpu}>
                                {
                                    (<Button variant='outline-danger'
                                        onClick={() => deleteGpu(gpu._id)}>Delete</Button>)
                                }
                            </Product></Col>)
                    }
                </Row>
            </div>
            <div className='w-25 text-center pt-4'>
                <Button onClick={() => navigate('/addProducts')} className='w-100 ms-4' variant='outline-dark'>Add Items</Button>
            </div>

        </div>
    );
};

export default ManageProducts;