import "./SignUp.css";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PostTheDetails } from "../../API/Service";

const SignUpUser = () => {

  const navigate = useNavigate();
  const [getLogin, setLogin] = useState({
    name: '',
    email: '',
    password: '',
    phonenumber: '',
  });

  const Handlesignin = async () => {
    const req = await PostTheDetails(getLogin);
    if (req) {
      navigate('/');
    }
  };

  return (
    <div className="container">
      <div className="top">
        <img src={'/Asserts/Signin/signin.png'} alt="Logo" className="logo" />
      </div>
      <div className="bottom"></div>
      <div className="center">
        <h2>SingUP Page</h2>
        <input type="text" id="name" name="name" placeholder="name" value={getLogin.name} onChange={(e) => {
          setLogin(getLogin => ({ ...getLogin, name: e.target.value }))
        }} />
        <input type="text" id="email" name="email" placeholder="Email" value={getLogin.email} onChange={(e) => {
          setLogin(getLogin => ({ ...getLogin, email: e.target.value }))
        }} />
        <input
          type="number" id="phonenumber" name="phonenumber" placeholder="phonenumber" value={getLogin.phonenumber} onChange={(e) => {
            setLogin(getLogin => ({ ...getLogin, phonenumber: parseInt(e.target.value) }))
          }}
        />

        <input type="password" name="password" value={getLogin.password} placeholder="password" id="password" onChange={(e) => {
          setLogin(getLogin => ({ ...getLogin, password: e.target.value }))
        }} />
        <p ><Link className="noew" to='/'>Already have account?</Link></p>
        <button type="button" onClick={Handlesignin}>Sign-in</button>
        <h2>&nbsp;</h2>
      </div>
    </div>
  );
};

export default SignUpUser;
