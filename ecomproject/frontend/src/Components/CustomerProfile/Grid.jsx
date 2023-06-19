import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Getprofiledata, Deleteprofiledata } from '../../API/Service';
import "./Grid.css";

const Grid = () => {
  const key = "OUJ3N4KJH234JKH23H4J324";
  const storedData = sessionStorage.getItem(key);
  const userObj = JSON.parse(storedData);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery('items', Getprofiledata);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  const handleDelete = async (id) => {
    await Deleteprofiledata(id);
    queryClient.invalidateQueries('items');
  };

  const BeforeEdit = (id) => {
    navigate(`/profile/${id}`);
  }

  const date = new Date(userObj.datelog);
  const formattedDate = date.toLocaleDateString(); // Format the date
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // Format the time

  return (
    <div className="containeres">
      <div className="profile-card">
        <img src={'/Asserts/prologoss.png'} className='logopro' alt="image" />
        <h1>Amcart</h1>
        <div className="designation">Profile</div>
        <div className="grid-container">
          {data.map((item) => (
            <div className="grid-item" key={item._id}>
              <div className="grid-label">Customer Name:</div>
              <div className="grid-value">{userObj.name}</div>
              <div className="grid-label">Email ID:</div>
              <div className="grid-value">{userObj.email}</div>
              <div className="grid-label">Phone Number:</div>
              <div className="grid-value">{userObj.phonenumber}</div>
              <div className="grid-label">Account created Date:</div>
              <div className="grid-value">{formattedDate}</div>
              <div className="grid-label">Account created Time:</div>
              <div className="grid-value">{formattedTime}</div>
              <div className="grid-label">Door Number:</div>
              <div className="grid-value">{item.doornumber}</div>
              <div className="grid-label">Street:</div>
              <div className="grid-value">{item.street}</div>
              <div className="grid-label">Landmark:</div>
              <div className="grid-value">{item.landmark}</div>
              <div className="grid-label">Pincode:</div>
              <div className="grid-value">{item.pincode}</div>
              <div className="grid-label">District:</div>
              <div className="grid-value">{item.district}</div>
              <div className="grid-label">Location:</div>
              <div className="grid-value">{item.location}</div>
              <div className="grid-label">Description:</div>
              <div className="grid-value">{item.description}</div>
              <div className="actions">
                <img className='deletes' src='/Asserts/trash.gif' onClick={() => handleDelete(item._id)}></img>
                <img className='deletes' src='/Asserts/edit.gif' onClick={() => BeforeEdit(item._id)}></img>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grid;
