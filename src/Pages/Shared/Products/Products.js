import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useProducts from '../../../hooks/useProducts';
import Product from '../../Shared/Product/Product';
import Loading from '../Loading/Loading';


const Products = () => {
    const { length } = useParams();
    const [products] = useProducts();

    if (products?.length === 0) {
        return <Loading></Loading>
    }

    let gpus = (length === 'all') ? products : products.slice(0, 6);

    return (
        <div className='m-5 d-flex flex-column'>
            <Row className='g-3'>
                {
                    gpus.map(gpu =>
                        <Col
                            key={gpu._id}
                            md={4}>
                            <Product
                                gpu={gpu}>
                            </Product>
                        </Col>)
                }
            </Row>
        </div>
    );
};

export default Products;