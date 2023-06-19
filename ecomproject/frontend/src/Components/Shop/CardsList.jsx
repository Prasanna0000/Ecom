import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import data from "../../data.json"
import './Cardslist.css'; // Import CSS file for styling

function CardsList() {
    const [products, setProducts] = useState([]);
    const [countMap, setCountMap] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedproduct, setTheProduct] = useState({
        productdetails: [],
        productcount: []
    })
    const navigate = useNavigate();
    useEffect(() => {
        const Fetchdata = async () => {

            setProducts(data);

        };

        Fetchdata();
    }, []);

    const Handleincrement = (id) => {
        setCountMap((prevCountMap) => ({
            ...prevCountMap,
            [id]: (prevCountMap[id] || 0) + 1,
        }));
    };




    const Handledecrement = (id) => {
        setCountMap((prevCountMap) => {
            const count = prevCountMap[id] || 0;
            if (count > 0) {
                return {
                    ...prevCountMap,
                    [id]: count - 1,
                };
            }
            return prevCountMap;
        });
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const selectedProductDetails = [];
        const selectedProductCounts = [];

        filteredProducts.forEach((product) => {
            const count = countMap[product.id] || 0;
            if (count > 0) {
                selectedProductDetails.push(product);
                selectedProductCounts.push(count);
            }
        });

        setTheProduct({
            productdetails: selectedProductDetails,
            productcount: selectedProductCounts,
        });
    }, [products, searchQuery, countMap]);

    const dataString = JSON.stringify(selectedproduct);

    // Set the string in the session storage
    sessionStorage.setItem('myObject', dataString);


    const sumVal = selectedproduct.productcount
    const sum = sumVal.reduce((accumulator, currentValue) => accumulator + currentValue, 0);





    const AddButton = (id) => {
        navigate(`/viewcards/${id}`);
    };

    return (
        <div className="cards-list" >

            <div className='shopicon'>
                <button type="button" class="icon-button">
                    {/* <span class="material-icons">notifications</span> */}
                    <span class="material-icons">
                        <Link to='/addedIteams'> shopping_cart</Link>
                    </span>
                    <span class="icon-button__badge">{sum}</span>
                </button>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search"
                />
            </div>


            {filteredProducts.map((product) => (
                <div className='cardss'>
                    <div key={product.id} className="card">
                        <img src={product.image} alt={product.title} className="card-image" />
                        <div className="card-details">
                            <p>{product.title}</p>
                            <p className='amounts'>Price : ${product.price}</p>
                            <div className="count-controls">
                                <button className='btncss' onClick={() => Handledecrement(product.id)}>-</button>
                                <span className='countval'>{countMap[product.id] || 0}</span>
                                <button className='btncss' onClick={() => Handleincrement(product.id)}>+</button>
                            </div>
                            <Link to='/addedIteams'><button>View Card</button></Link>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}

export default CardsList;
