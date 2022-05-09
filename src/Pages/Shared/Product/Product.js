import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './product.css'

const Product = ({ gpu, children }) => {
    const { _id, image, name, info, price, quantity, supplier, sold } = gpu;
    const navigate = useNavigate();
    return (
        <div className='product border p-3 rounded d-flex flex-column'>
            <div>
                <img className='w-100' src={image} alt="" srcset="" />
                <h4>{name}</h4>
                <p><b>Price: </b> {price?.toLocaleString('en-IN', { style: 'currency', currency: 'BDT', minimumFractionDigits: 2 })}</p>
                <p><b>Quantity: </b> {quantity}</p>
                <p><b>Sold: </b> {sold}</p>
                <p>{info.length > 100 ? info.substr(0, 100) : info}...</p>
                <p><b>Supplier: </b> {supplier}</p>
            </div>
            {children}
            <Button onClick={() => navigate(`/inventory/${_id}`)} className='my-3' variant='outline-dark'>Update</Button>

        </div>
    );
};

export default Product;