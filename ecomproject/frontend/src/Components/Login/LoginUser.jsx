import "./Login.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { GetUserdata, PostLoginLogDetails } from "../../API/Service";

const LoginUser = () => {
    const navigate = useNavigate();
    const key = "OUJ3N4KJH234JKH23H4J324";
    const [getLogin, setLogin] = useState({
        email: '',
        password: ''
    });
    const [dbData, setData] = useState([])

    useEffect(() => {
        Getgrid();
    }, []);

    async function Getgrid() {
        const res = await GetUserdata();
        if (res.data) {
            setData(res.data)
        }
    }

    const Handlelogin = async () => {
        for (let index = 0; index < dbData.length; index++) {
            const element = dbData[index];
            if (getLogin.password === element.password) {
                const res = await PostLoginLogDetails(getLogin);
                sessionStorage.setItem(key, JSON.stringify(element));
                navigate(`/card`);
            }
        }
    };

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
                <button type='button' onClick={Handlelogin}>
                    Login
                </button>
                <h2>&nbsp;</h2>
            </div>
        </div>
    );
};

export default LoginUser;
