
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketPage.css';

const TicketPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/card'); // Navigate to the next page after a certain duration (e.g., 3 seconds)
    }, 2400);

    return () => clearTimeout(timer); // Clean up the timer when the component unmounts
  }, [navigate]);

  return (
    <div className="container">
      <h1>Payment Successfully</h1>
      <img src={'/Asserts/PaycheckImg/paytick.gif'} alt="Success" />
      <p>Redirecting to the Card page...</p>
    </div>
  );
};


export default TicketPage;

