import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './product.css'

const Product = ({ gpu, children }) => {
    const { _id, image, name, info, price, quantity, supplier, sold, email } = gpu;
    const navigate = useNavigate();
    return (
        <div className='shadow mb-5 product d-flex flex-column'>
            <Card.Img variant="top" className='w-75 mx-auto' src={image} />
            <Card.Body className='py-4'>
                <h5 className='boldPoppins'>{name}</h5>
                <h6>
                    <b>Price: </b> {price?.toLocaleString('en-IN',
                        {
                            style: 'currency', currency: 'BDT', minimumFractionDigits: 2
                        })}
                </h6>
                <h6><b>Quantity: </b> {quantity}</h6>
                <h6><b>Sold: </b> {sold}</h6>
                <h6 className='poppins'>
                    {info?.length > 100 ? info.substr(0, 100) : info}...
                </h6>
                <h6><b>Supplier: </b> {supplier}</h6>
                {email && <h6><b>User's Email: </b> {email}</h6>}
                <div>
                    <Button onClick={() => navigate(`/inventory/${_id}`)} className='my-2 w-100' variant='outline-dark'>Update</Button>
                    {children}
                </div>
            </Card.Body>
        </div>
    );
};

export default Product;