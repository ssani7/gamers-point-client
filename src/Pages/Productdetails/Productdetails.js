import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../Shared/Footer/Footer';
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
        fetch(`https://assignment-11-gpu-inventory.herokuapp.com/gpu/${id}`)
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
        if (currentQuantity <= 0) {
            return toast.error("No more products to deliver");
        }
        const newSold = currentSold + 1;
        const newQuantity = currentQuantity - 1;
        const updatedGpu = { quantity: newQuantity, sold: newSold };

        fetch(`https://assignment-11-gpu-inventory.herokuapp.com/deliver/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updatedGpu),
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    toast.error(`You do not have access. Try logging in again `);
                    return
                } else {
                    setCurrentSold(newSold)
                    setCurrentQuantity(newQuantity)
                    return res.json();
                }
            })
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

            fetch(`https://assignment-11-gpu-inventory.herokuapp.com/restock/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(updatedGpu),
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        toast.error(`You do not have access. Try logging in again `);
                        return res.json();
                    }
                })
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
        <div>
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
            <Footer></Footer>
        </div>
    );
};

export default Productdetails;

