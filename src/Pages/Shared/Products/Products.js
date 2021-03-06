import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useProducts from '../../../hooks/useProducts';
import Product from '../../Shared/Product/Product';
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';


const Products = () => {
    const { length } = useParams();
    const [products] = useProducts();

    if (products?.length === 0) {
        return <Loading></Loading>
    }

    let gpus = (length === 'all') ? products : products.slice(0, 6);

    return (
        <div>
            <div className='m-5 d-flex flex-column'>
                <h2 className='boldPoppins text-center mb-5'> {length === 'all' ? 'All Inventory Products' : 'Available Products'} </h2>
                <Row className='g-4'>
                    {
                        gpus.map(gpu =>
                            <Col
                                key={gpu._id}
                                md={6}
                                lg={4}>
                                <Product
                                    gpu={gpu}>
                                </Product>
                            </Col>)
                    }
                </Row>
            </div>
            {length === 'all' && <Footer></Footer>}
        </div>
    );
};

export default Products;