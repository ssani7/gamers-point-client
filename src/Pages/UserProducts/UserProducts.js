import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'
import Loading from '../Shared/Loading/Loading';
import Product from '../Shared/Product/Product';

const UserProducts = () => {
    const [products, setProducts] = useState([]);
    const [user, loading] = useAuthState(auth);


    useEffect(() => {
        axios.get(`https://sheltered-hollows-42967.herokuapp.com/mygpu/${user?.email}`)
            .then(res => setProducts(res.data))
    }, [user?.email])

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

    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        if (products.length === 0) {
            return <h2 className='boldPoppins text-center my-5'>You do not have any added items. Please add items to see your item list</h2>
        }
    }

    return (
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
    );
};

export default UserProducts;