import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';
import './Productdetails.css'

const Productdetails = () => {
    const { id } = useParams()
    const [gpu, setGpu] = useState({});
    const [loading, setLoading] = useState(true);
    const { _id, name, image, price, info, supplier } = gpu;
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const [currentSold, setCurrentSold] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:5000/gpu/${id}`)
            .then(res => res.json())
            .then(data => {
                setGpu(data)
                setCurrentQuantity(data.quantity)
                setCurrentSold(data.sold)
                setLoading(false)
            })
    }, [])

    const handleDelivered = () => {
        const newSold = currentSold + 1;
        const newQuantity = currentQuantity - 1;

        setCurrentSold(newSold)
        setCurrentQuantity(newQuantity)

        const updatedGpu = { quantity: newQuantity, sold: newSold };

        fetch(`http://localhost:5000/deliver/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedGpu),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    const handleAdd = (e) => {
        e.preventDefault();
        const newQuantity = currentQuantity + parseInt(e.target.add.value);
        const updatedGpu = { quantity: newQuantity };
        setCurrentQuantity(newQuantity);

        fetch(`http://localhost:5000/restock/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedGpu),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                e.target.reset()
            })
    }
    return (
        <div>
            {
                loading ? <Loading></Loading> : (
                    <div className='mx-5 d-flex align-items-center justify-content-center'>
                        <img className='w-50' src={image} alt="" />
                        <div className='w-50 product-info'>
                            <h1>{name}</h1>
                            <p><b>ProductId: </b> {_id}</p>
                            <p><b>Price: </b> {price?.toLocaleString('en-IN', { style: 'currency', currency: 'BDT', minimumFractionDigits: 2 })}</p>
                            <p><b>Quantity: </b> {currentQuantity}</p>
                            <p><b>Sold: </b> {currentSold}</p>
                            <p><b>Overview: </b> {info}</p>
                            <p><b>Supplier: </b> {supplier}</p>
                            <button onClick={handleDelivered}>Delivered</button>
                            <form className='my-3' onSubmit={handleAdd}>
                                <label className='me-2' htmlFor="add">Restock the Items</label>
                                <input name='add' type="number" />
                                <input type="submit" value="Add" />
                            </form>
                            <Link to='/manageProducts'>
                                <Button variant='outline-dark'>Manage Inventory</Button>
                            </Link>
                        </div>
                    </div>)
            }
        </div>
    );
};

export default Productdetails;