import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { PostorderdetailsData } from '../../API/Service';

const ProductDetails = () => {
    const key = "OUJ3N4KJH234JKH23H4J324";
    const storedDatas = sessionStorage.getItem(key);
    const userObj = JSON.parse(storedDatas);
    const [total, setTotal] = useState(0);
    const [storeProductname, setProductname] = useState([]);

    const storedDataString = sessionStorage.getItem('myObject');
    const storedData = JSON.parse(storedDataString);
    const val = storedData.productdetails;

    useEffect(() => {
        const productNames = val.map((product) => product.title);
        setProductname(productNames);
    }, [0]);

    useEffect(() => {
        let totalSum = 0;
        val.forEach((product) => {
            const price = product.price;
            totalSum += price;
        });
        setTotal(totalSum);
    }, [val]);

    const invoiceData = {
        username: userObj.name,
        useremail: userObj.email,
        totalprice: total,
        productcount: storedData.productcount,
        productname: storeProductname
    };

    const mutation = useMutation(PostorderdetailsData, {
        onSuccess: () => {
            // Handle successful post operation, e.g., show a success message
            console.log('Order details data posted successfully');
        },
        onError: (error) => {
            // Handle error, e.g., show an error message
            console.error('Failed to post order details data:', error);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(invoiceData);
    };

    return (
        <div>
            <h2>Product Details</h2>
            <div>
                <p>Username: {invoiceData.username}</p>
                <p>User Email: {invoiceData.useremail}</p>
                <p>Total Price: {invoiceData.totalprice}</p>
                <p>Product Count: {invoiceData.productcount}</p>
                <p>Product Names: {invoiceData.productname.join(', ')}</p>
            </div>
            <form onSubmit={handleSubmit}>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ProductDetails;
