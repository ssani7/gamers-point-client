import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import './AddProduct.css'

const AddProducts = () => {
    const addProduct = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const price = parseInt(e.target.price.value);
        const quantity = parseInt(e.target.quantity.value);
        const sold = parseInt(e.target.sold.value);
        const info = e.target.info.value;
        const supplier = e.target.supplier.value;
        const image = e.target.image.value;
        const email = e.target.image.value;

        const product = { email, name, price, quantity, sold, info, supplier, image }

        const addProductToDB = async () => {
            await axios.post(`http://localhost:5000/gpu`, product)
                .then(res => {
                    const { data } = res;
                    if (data.insertedId) {
                        toast.success(`Successfully Inserted ${name}`)
                        e.target.reset()
                    }
                })
        }
        addProductToDB()
    }

    return (
        <div className='text-center add-product mt-3'>
            <h2>Please Provide Product Information</h2>
            <form onSubmit={addProduct} className='w-50 mx-auto mt-3'>
                <input type="text" name='name' placeholder="Product Name" /><br />
                <input type="number" name='price' placeholder="Price" /><br />
                <input type="number" name='quantity' placeholder="Quantity" /><br />
                <input type="number" name='sold' placeholder="Sold" /><br />
                <textarea type="text" name='info' placeholder="Product Description" /><br />
                <input type="text" name='supplier' placeholder="Supplier" /><br />
                <input type="text" name='image' placeholder="Image Link" /><br />
                <input type="email" name='email' placeholder="Email" /><br />
                <input className='w-25 px-3 py-1 mb-3 btn btn-outline-dark' type="submit" value="Add Product" />
            </form>
        </div>
    );
};

export default AddProducts;