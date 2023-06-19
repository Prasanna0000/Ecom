import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import data from "../data.json"
import { Link, useNavigate } from 'react-router-dom';
const ViewCardsList = () => {

    console.log(data, 'data');
    const [products, setProducts] = useState([]);
    // const [addCard, setCard] = useState([]);
    const params = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
             //   const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(data);
            } catch (error) {
                return error;
            }
        };

        fetchData();
    }, []);

    const Buyproduct = (e) => {
        if (e.target.id == products.id) {

            // <ViewCardsList data={products.title}></ViewCardsList>
        }
        navigator('/demo/' + e.target.id)
    }

    const Viewpoduct = () => products.map((products) => {
        if (params.id == products.id) {
            return (
                <>
                    <div>
                        <div className='res1'>
                            <img src={products.image} alt={products.title} className="card-image1" />
                        </div>
                        <div className='res2'>
                            <h2 className='nono'>{products.title}</h2>
                        </div>
                    </div>
                    <p className='new11'>{products.description}</p>
                    <p className='price'>Price: ${products.price}</p>
                    <button className='btns1' name={products.title} id={products.id} onClick={(e) => { Buyproduct(e) }}> Buy Item</button>
                </>
            )
        }
    })
    return (
        <>
            <h1>View Product</h1>
            <div>{Viewpoduct()}</div>
        </>

    )
}

export default ViewCardsList;