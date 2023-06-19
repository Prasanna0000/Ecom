import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { GetUserdata, PostLoginLogDetails } from "../../API/Service";
import { useMutation } from "react-query";

const LoginUser = () => {
    const navigate = useNavigate();
    const key = "OUJ3N4KJH234JKH23H4J324";
    const [getLogin, setLogin] = useState({
        email: '',
        password: ''
    });
    const [dbData, setDbData] = useState([]);

    useEffect(() => {
        getGrid();
    }, []);

    async function getGrid() {
        const res = await GetUserdata();
        if (res.data) {
            setDbData(res.data);
        }
    }

    const handleStore = () => {
        const user = dbData.find((element) => element.password === getLogin.password);
        if (user) {
            mutation.mutate(user);
        }
    };

    const mutation = useMutation(PostLoginLogDetails, {
        onSuccess: (user) => {
            sessionStorage.setItem(key, JSON.stringify(user));
            navigate(`/card`);
        },
        // Handle any additional options and callbacks as needed
    });


    return (
        <div className="container">
            <div className="top">
                <img src='/Asserts/LoginImg/login.png' className="logo" alt="Logo" />
            </div>
            <div className="bottom"></div>
            <div className="center">
                <h2>LoginUser</h2>
                <input
                    type='text'
                    id='email'
                    name='email'
                    value={getLogin.email}
                    onChange={(e) => {
                        setLogin((getLogin) => ({ ...getLogin, [e.target.name]: e.target.value }));
                    }}
                    placeholder="Email"
                />
                <input
                    type='password'
                    name='password'
                    value={getLogin.password}
                    id='password'
                    onChange={(e) => {
                        setLogin((getLogin) => ({ ...getLogin, [e.target.name]: e.target.value }));
                    }}
                    placeholder="Password"
                />
                <p>FORGOT PASSWORD</p>
                <p><Link className="noew" to='/signup'>Create new account</Link></p>
                <button type='button' onClick={handleStore}>
                    Login
                </button>
                <h2>&nbsp;</h2>
            </div>
        </div>
    );
};

export default LoginUser;
