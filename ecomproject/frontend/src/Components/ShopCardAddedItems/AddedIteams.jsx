import React, { useEffect, useState } from 'react';
import './AddedItems.css';
import { Link } from 'react-router-dom';

const AddedItems = () => {
    const [total, setTotal] = useState(0);
    const storedDataString = sessionStorage.getItem('myObject');
    const storedData = JSON.parse(storedDataString);
    const val = storedData.productdetails;
    const count = storedData.productcount;

    useEffect(() => {
        let totalSum = 0; // Initialize the total sum

        val.forEach((product) => {
            const price = product.price;
            totalSum += price; // Add the product price to the total sum
        });

        setTotal(totalSum); // Update the total sum state
    }, [val]); // Run this effect only when the 'val' dependency changes

    const Checkoutdatabinded = () => {
        return val.map((product, index) => {
            return (
                <div key={index} className="row">
                    <div className="column" style={{ backgroundColor: '#aaa' }}>
                        <img src={product.image} alt={product.title} />
                        <h2>{product.title}</h2>
                        <p>Some text..</p>
                    </div>
                    <div className="column1" style={{ backgroundColor: '#bbb' }}>
                        <p className="descp">{product.description}</p>
                        <p className="amounts">Price: ${product.price}</p>
                        <p className="rate">rating: {product.rating.rate}</p>
                        <p>Product available Count: {product.rating.count}</p>
                        <p>Product Category: {product.category}</p>
                        <p>Item Ordered: {storedData.productcount[index]}</p>

                    </div>
                </div>
            );
        });
    };

    return (
        <>

            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Product Details</td>
                        </tr>
                    </thead>
                    <tbody>{Checkoutdatabinded()}</tbody>
                </table>
            </div>
            <div className='widt'></div>
            <table className='new1'>
                <thead>
                    <th className='total'>Total Product amount Sum:</th>
                    <th className='total'>Tax amount:</th>
                    <th className='total'>Total amount Sum:</th>
                </thead>
                <tbody>
                    <tr>
                        <td className='values'> ${total}</td>
                        <td className='values'> 3 %</td>
                        <td className='values'>${((3 / 100) * total + total).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <Link to='/paycheck'> <button className='bts'>Check Out </button></Link>
        </>
    );
};

export default AddedItems;
