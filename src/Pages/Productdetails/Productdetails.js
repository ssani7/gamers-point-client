import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading/Loading';
import './Productdetails.css'

const Productdetails = () => {
    const { id } = useParams()
    const [gpu, setGpu] = useState({});
    const [loading, setLoading] = useState(true);
    const { _id, name, image, price, info, supplier, email } = gpu;
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const [currentSold, setCurrentSold] = useState(0);

    useEffect(() => {
        fetch(`https://sheltered-hollows-42967.herokuapp.com/gpu/${id}`)
            .then(res => res.json())
            .then(data => {
                setGpu(data)
                setCurrentQuantity(data.quantity)
                setCurrentSold(data.sold)
                setLoading(false)
            })
    }, [id])

    if (loading) {
        return <Loading></Loading>
    }

    const handleDelivered = () => {
        const newSold = currentSold + 1;
        const newQuantity = currentQuantity - 1;

        setCurrentSold(newSold)
        setCurrentQuantity(newQuantity)

        const updatedGpu = { quantity: newQuantity, sold: newSold };

        fetch(`https://sheltered-hollows-42967.herokuapp.com/deliver/${id}`, {
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
        const toAdd = parseInt(e.target.add.value);
        const newQuantity = currentQuantity + toAdd;
        const updatedGpu = { quantity: newQuantity };

        if (toAdd > 0) {
            setCurrentQuantity(newQuantity);

            fetch(`https://sheltered-hollows-42967.herokuapp.com/restock/${id}`, {
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
        else {
            toast.warn('Please input a valid number to add')
        }

    }
    return (
        <div className='mx-5 d-flex flex-column flex-lg-row align-items-center justify-content-center '>
            <img className='w-100' src={image} alt="" />
            <div className='w-100 product-info'>
                <h1 className='boldPoppins'>{name}</h1>
                <p><b>ProductId: </b> {_id}</p>
                <p><b>Price: </b> {price?.toLocaleString('en-IN', { style: 'currency', currency: 'BDT', minimumFractionDigits: 2 })}</p>
                <p><b>Quantity: </b> {currentQuantity}</p>
                <p><b>Sold: </b> {currentSold}</p>
                <Button variant='outline-dark mb-3' onClick={handleDelivered}>Delivered</Button>
                <form onSubmit={handleAdd} className='d-flex align-items-center mb-3'>
                    <input name='add' type="number" className="form-control d-inline" placeholder="Restock Items" aria-label="Restock Items" aria-describedby="button-addon2" />
                    <input className="btn btn-outline-dark" type="submit" value="Add Items" id="button-addon2" />
                </form>
                <Link to='/manageProducts'>
                    <Button variant='outline-dark'>Manage Inventory</Button>
                </Link>
                <p className='mt-3'><b>Overview: </b> <span className='poppins'><small>{info}</small></span></p>
                <p><b>Supplier: </b> {supplier}</p>
                {email && <p><b>User's Email: </b> {email}</p>}
            </div>
        </div>
    );
};

export default Productdetails;

