import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { PostTheDetails } from '../../API/Service';

const SigninQuery = () => {
    const navigate = useNavigate();
    const [getLogin, setLogin] = useState({
        name: '',
        email: '',
        password: '',
        phonenumber: '',
    });

    const mutation = useMutation(PostTheDetails, {
        onSuccess: () => {
            // Handle successful post operation, e.g., show a success message
            navigate('/loginquery');
        },
        onError: (error) => {
            // Handle error, e.g., show an error message
        }
    });

    const Handlesignin = (e) => {
        e.preventDefault();
        mutation.mutate(getLogin);
    };

    return (
        <div className="container">
            <div className="top">
                <img src={'/Asserts/Signin/signin.png'} alt="Logo" className="logo" />
            </div>
            <div className="bottom"></div>
            <div className="center">
                <h2>SingUP Page</h2>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="name"
                    value={getLogin.name}
                    onChange={(e) => {
                        setLogin((prev) => ({ ...prev, name: e.target.value }));
                    }}
                />
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={getLogin.email}
                    onChange={(e) => {
                        setLogin((prev) => ({ ...prev, email: e.target.value }));
                    }}
                />
                <input
                    type="number"
                    id="phonenumber"
                    name="phonenumber"
                    placeholder="phonenumber"
                    value={getLogin.phonenumber}
                    onChange={(e) => {
                        setLogin((prev) => ({ ...prev, phonenumber: parseInt(e.target.value) }));
                    }}
                />

                <input
                    type="password"
                    name="password"
                    value={getLogin.password}
                    placeholder="password"
                    id="password"
                    onChange={(e) => {
                        setLogin((prev) => ({ ...prev, password: e.target.value }));
                    }}
                />
                <p>
                    <Link className="noew" to='/'>Already have an account?</Link>
                </p>
                <button type="button" onClick={Handlesignin}>
                    Sign-in
                </button>
                <h2>&nbsp;</h2>
            </div>
        </div>
    );
};

export default SigninQuery;
