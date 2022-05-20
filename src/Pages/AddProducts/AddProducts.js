import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import './AddProduct.css'

const AddProducts = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [user] = useAuthState(auth);

    const addProduct = formData => {
        const name = formData.name;
        const price = parseInt(formData.price);
        const quantity = parseInt(formData.quantity);
        const sold = parseInt(formData.sold);
        const info = formData.info;
        const supplier = formData.supplier;
        const image = formData.image;
        const email = formData.email;

        const product = { email, name, price, quantity, sold, info, supplier, image }

        const addProductToDB = async () => {
            await axios.post(`https://sheltered-hollows-42967.herokuapp.com/gpu`, product)
                .then(res => {
                    const { data } = res;
                    if (data.insertedId) {
                        toast.success(`Successfully Inserted ${name}`);
                        reset();
                    }
                })
        }
        addProductToDB()
    }

    return (
        <div className='text-center add-product mt-3'>
            <h2 className='my-4'>Please Provide Product Information</h2>
            <form onSubmit={handleSubmit(addProduct)} className='container mx-auto mt-3 customInputadd'>
                <input type="text" placeholder="Product Name" {...register("name", {
                    required: 'Product Name is required'
                })} />
                {errors?.name && <p className='text-danger mb-1'><small>{errors?.name?.message}</small></p>}

                <input type="number" placeholder="Price" {...register("price", {
                    required: 'Product price is required',
                    validate: {
                        positive: v => parseInt(v) > 0 || 'should be greater than 0'
                    }
                })} />
                {errors?.price && <p className='text-danger mb-1'><small>{errors?.price?.message}</small></p>}

                <input type="number" placeholder="Quantity" {...register("quantity", {
                    required: 'Product quantity is required',
                    validate: {
                        positive: v => parseInt(v) > 0 || 'should be greater than 0'
                    }
                })} />
                {errors?.quantity && <p className='text-danger mb-1'><small>{errors?.quantity?.message}</small></p>}

                <input type="number" placeholder="Sold" {...register("sold", {
                    required: 'Sold number is required',
                    validate: {
                        positive: v => parseInt(v) >= 0 || 'should not be negative number'
                    }
                })} />
                {errors?.sold && <p className='text-danger mb-1'><small>{errors?.sold?.message}</small></p>}

                <textarea className='fs-5 pt-2' type="text" placeholder="Product Description" {...register("info", {
                    required: 'Product description is required'
                })} />
                {errors?.info && <p className='text-danger mb-1'><small>{errors?.info?.message}</small></p>}

                <input type="text" placeholder="Supplier" {...register("supplier", {
                    required: 'Product supplier is required'
                })} />
                {errors?.supplier && <p className='text-danger mb-1'><small>{errors?.supplier?.message}</small></p>}

                <input type="text" placeholder="Image Link" {...register("image", {
                    required: 'Product image link is required'
                })} />
                {errors?.image && <p className='text-danger mb-1'><small>{errors?.image?.message}</small></p>}

                <input type="email" placeholder="Email" readOnly value={user?.email} {...register("email", {
                    required: 'User email is required'
                })} />
                {errors?.email && <p className='text-danger mb-1'><small>{errors?.email?.message}</small></p>}

                <input className='mb-3 btn btn-outline-dark' type="submit" value="Add Product" />
            </form>
        </div>
    );
};

export default AddProducts;