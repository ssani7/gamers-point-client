import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init'
import Footer from '../Shared/Footer/Footer';
import Loading from '../Shared/Loading/Loading';
import Product from '../Shared/Product/Product';

const UserProducts = () => {
    const [products, setProducts] = useState([]);
    const [user, loading] = useAuthState(auth);

    const [config, setConfig] = useState({
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    });

    useEffect(() => {
        axios.get(`https://assignment-11-gpu-inventory.herokuapp.com/mygpu/${user?.email}`, config)
            .then(res => setProducts(res.data))
            .catch(err => {
                if (err.response.status === 401 || err.response.status === 403) {
                    toast.error(`You do not have access. Try logging in again`)
                    return
                }
            })
    }, [user, config])

    const deleteGpu = ([id, name]) => {
        const proceed = window.confirm(`Are you sure to delete "${name}"?`);

        if (proceed) {
            axios.delete(`https://assignment-11-gpu-inventory.herokuapp.com/gpu/${id}`, config)
                .then(res => {
                    const newGpus = products.filter(product => product._id !== id);
                    setProducts(newGpus);
                })
                .catch(err => {
                    if (err.response.status === 401 || err.response.status === 403) {
                        toast.error(`You do not have access. Try logging in again`)
                        return
                    }
                })
        }
    }

    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        if (products.length === 0) {
            return <h2 className='boldPoppins text-center my-5'>You do not have any added items. Please add items to see your item list</h2>
        }
    }

    return (
        <div>
            <div className='m-5'>
                <h2 className='boldPoppins text-center my-5'>All of Your Added Products</h2>
                <Row className='g-3'>
                    {
                        products.map(product =>
                            <Col
                                key={product._id}
                                md={4}>
                                <Product
                                    gpu={product}>
                                    {(<Button
                                        variant='outline-danger w-100'
                                        onClick={() => deleteGpu([product._id, product.name])}
                                    >Delete</Button>)}
                                </Product>
                            </Col>)
                    }
                </Row>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default UserProducts;