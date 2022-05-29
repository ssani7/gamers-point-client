import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CountUp from 'react-countup';
import useProducts from '../../../hooks/useProducts'

const Summary = () => {
    const [products] = useProducts()
    let totalQuantity = 0;
    let totalSold = 0;
    let totalProducts = products.length;

    products.map(product => {
        totalQuantity = totalQuantity + product.quantity;
        totalSold = totalSold + product.sold;
    });
    console.log(totalQuantity, totalSold, totalProducts)
    return (
        <div className='h-50 py-5 px-5 grid text-center border '>
            <Row>
                <Col>
                    <div>
                        <h1><CountUp end={totalProducts}
                            duration={2} /></h1>
                        <h2>Different Products</h2>
                    </div>
                </Col>
                <Col>
                    <div>
                        <h1><CountUp end={totalQuantity}
                            duration={2} /></h1>
                        <h2>Available Stock</h2>
                    </div>
                </Col>
                <Col>
                    <div>
                        <h1><CountUp end={totalSold}
                            duration={2} /></h1>
                        <h2>Products Sold</h2>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Summary;