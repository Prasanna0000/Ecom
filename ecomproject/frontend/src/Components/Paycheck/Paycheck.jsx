import React, { useState, useEffect } from 'react';
import "./Paycheck.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Paycheck = () => {


    const key = "OUJ3N4KJH234JKH23H4J324";
    const storedDatas = sessionStorage.getItem(key);
    const userObj = JSON.parse(storedDatas);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [counts, setCounts] = useState(0)
    const navigator = useNavigate();
    const [storeProductname, setproductname] = useState([]);// to get theproduct title to store it into db

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const [total, setTotal] = useState(0);
    const storedDataString = sessionStorage.getItem('myObject');
    const storedData = JSON.parse(storedDataString);
    const val = storedData.productdetails;
    const count = storedData.productcount;




    // Function to post data to the API
    const postDataToAPI = async (invoiceData) => {
        try {
            const response = await axios.post('http://localhost:4000/api/orderdetails', invoiceData);
            if (response.data) {
                navigator('/ticketPage')
            }
        } catch (error) {
        }
    };

    // Usage example
    const invoiceData = {
        username: userObj.name,
        useremail: userObj.email,
        totalprice: total,
        productcount: storedData.productcount,
        productname: storeProductname
    };
    const handlePayment = () => {
        postDataToAPI(invoiceData)
    }


    // api function 

    useEffect(() => {
        const productNames = val.map((product) => product.title);
        setproductname(productNames);
    }, [0]);


    useEffect(() => {
        let totalSum = 0; // Initialize the total sum

        val.forEach((product) => {
            const price = product.price;
            totalSum += price; // Add the product price to the total sum
        });

        setTotal(totalSum); // Update the total sum state
    }, [val]); // Run this effect only when the 'val' dependency changes


    const handlePayButtonClick = () => {
        openModal();
    };

    return (
        <div className="row">
            <div className="column">
                <img
                    alt="logo"
                    className="logogs"
                    src='/Asserts/PaycheckImg/paybackground.jpg'
                />

            </div>
            <div className="column news">
                <img src={val[counts].image} alt={val[counts].title} />
                <h2>{val[counts].title}</h2>
                {/* <p className="descp">{val[counts].description}</p> */}
                <p className="amounts">Price: ${val[counts].price}</p>
                {/* <p className="rate">rating: {val[counts].rating.rate}</p>
                        <p>Product available Count: {val[counts].rating.count}</p>
                        <p>Product Category: {val[counts].category}</p> */}
                <p className='countt'>Product Count: {storedData.productcount[counts]}</p>

                <div>
                    <div className='arrowangle'>
                        <img src={'/Asserts/PaycheckImg/left.png'} className={`arrow left ${counts === 0 ? 'disabled' : ''}`} onClick={() => setCounts(counts - 1)} style={{ pointerEvents: counts === 0 ? 'none' : 'auto' }} />
                        <img src={'/Asserts/PaycheckImg/right.png'} className={`arrow right ${counts === val.length - 1 ? 'disabled' : ''}`} onClick={() => setCounts(counts + 1)} style={{ pointerEvents: counts === val.length - 1 ? 'none' : 'auto' }} />
                    </div>

                    {/* <button onClick={() => setCounts(counts - 1)} disabled={counts === 0}>Previous</button>
                    
                    <button onClick={() => setCounts(counts + 1)} disabled={counts === val.length - 1}>Next</button> */}

                    {/* <button onClick={() => { handlePayment() }}>Testbtn</button> */}
                    <button onClick={handlePayButtonClick} className='pay' style={{ width: 'auto' }}>
                        Pay
                    </button>
                </div>


                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content animate">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <h2>Modal Login Form</h2>
                            <img alt='logoEcom' src="/Asserts/PaycheckImg/loog.png" className='logos'></img>
                            <div>
                                <img
                                    alt="logo"
                                    className="paypal"
                                    src={'https://seeklogo.com/images/P/paypal-logo-DF8B4BAFEE-seeklogo.com.png'}
                                />
                            </div>
                            <p>
                                <div>
                                    <input placeholder='Enter card Name' />
                                    <input placeholder='Enter card number' />
                                    <input placeholder='Enter card number' />
                                    <input placeholder='Enter card number' />
                                </div>
                                <button className='pay' onClick={handlePayment}>PAY</button>

                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Paycheck;
