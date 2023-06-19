import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom';
export default function Navbar() {


  const key = "OUJ3N4KJH234JKH23H4J324";
  const storedData = sessionStorage.getItem(key);
  const userObj = JSON.parse(storedData);
  return (
    <>
      <div className="topnav">
        <a><img className='logonav' src='/Asserts/NavbarImg/applogo.png' alt='nolog' ></img></a>
        <a href="#home"> <Link className='navli' to="/">Login</Link></a>
        <a href="#news"><Link className='navli' to="/signup">Sign-up</Link></a>
        <a href="#contact"><Link className='navli' to="/card">Shop Cards</Link></a>
        <a href="#about"><Link className='navli' to="/aboutus">About US</Link></a>
        <a><Link to="/"> <img src='/Asserts/NavbarImg/logout.png' className="ticks1" alt="logo" /></Link></a>
      </div>
      <div className="profile-icon">
        <img src='/Asserts/NavbarImg/profileicon.png' className="icons" alt="Profile Icon" />
        <div className="dropdown-content">
          <table>
            <tr>
              <td className='the'>Name</td>
              <td><Link to="/aboutus" className="profile-name">{userObj.name}</Link></td>
            </tr>
            <tr>
              <td className='the'>Email</td>
              <td><Link className="profile-email" to="/aboutus"> {userObj.email}</Link></td>
            </tr>
          </table>
          {/* <div> <Link to="/aboutus" className="profile-name"> Name :{userObj.name}</Link></div>
          <div ><Link className="profile-email" to="/aboutus"> Email : {userObj.email}</Link></div> */}
          <a><Link className="profile" to="/grid"> Profile</Link></a>
        </div>
      </div>

      <div>

      </div>
    </>
  )
}
