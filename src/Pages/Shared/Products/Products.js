import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useProducts from '../../../hooks/useProducts';
import Product from '../../Shared/Product/Product';


const Products = () => {
    const { length } = useParams();
    const [products] = useProducts();
    let gpus = (length === 'all') ? products : products.slice(0, 6);


    return (
        <div className='m-5 d-flex flex-column'>
            <Row className='g-3'>
                {
                    gpus.map(gpu => <Col md={4}>
                        <Product
                            key={gpu._id}
                            gpu={gpu}>

                        </Product></Col>)
                }
            </Row>
        </div>
    );
};

export default Products;