import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './product.css'

const Product = ({ gpu, children }) => {
    const { _id, image, name, info, price, quantity, supplier, sold, email } = gpu;
    const navigate = useNavigate();
    return (
        <Card className='h-100 shadow mb-5 bg-white rounded'>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title className='boldPoppins'>{name}</Card.Title>
                <Card.Text>
                    <b>Price: </b> {price?.toLocaleString('en-IN',
                        {
                            style: 'currency', currency: 'BDT', minimumFractionDigits: 2
                        })}
                </Card.Text>
                <Card.Text><b>Quantity: </b> {quantity}</Card.Text>
                <Card.Text><b>Sold: </b> {sold}</Card.Text>
                <Card.Text className='poppins'>
                    {info?.length > 100 ? info.substr(0, 100) : info}...
                </Card.Text>
                <Card.Text><b>Supplier: </b> {supplier}</Card.Text>
                {email && <Card.Text><b>User's Email: </b> {email}</Card.Text>}
                <div>
                    <Button onClick={() => navigate(`/inventory/${_id}`)} className='my-3 w-100' variant='outline-dark'>Update</Button>
                    {children}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Product;