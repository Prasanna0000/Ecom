import React from 'react'

const AboutUs = () => {

  // Get the string value from the session storage
  const storedDataString = sessionStorage.getItem('myObject');

  // Convert the string back to an object using JSON.parse
  const storedData = JSON.parse(storedDataString);


  return (
    <>
      <h1>About us</h1>
    </>
  )
}

export default AboutUs;