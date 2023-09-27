import './App.css';
import React from 'react';
import Form from './Form';
import Header from './Header';
import SessionClaim from './SessionClaim'
import SessionListing from './SessionListing';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <h1>WELCOME TO THE CITY FARM</h1>
          <Form />
           <SessionListing />
             <SessionClaim />
             <div
  className="image" // Use 'className' instead of 'class' for specifying CSS classes in JSX
  style={{
    height: "100%", // Wrap the value in quotes
    width: "100%",
    backgroundImage: `url("https://media.istockphoto.com/id/1340686692/photo/following-her-farm-routine.jpg?s=2048x2048&w=is&k=20&c=TUhAIdcyRv5MEUUOXSGSRQl3mt9bFVqG-SCRBnbPFho=")`, // Use template literals for URLs
    backgroundPosition: "center", // Use camelCase for CSS properties
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }}
></div>

      {/* <img src='https://media.istockphoto.com/id/1340686692/photo/following-her-farm-routine.jpg?s=2048x2048&w=is&k=20&c=TUhAIdcyRv5MEUUOXSGSRQl3mt9bFVqG-SCRBnbPFho=' alt='Feeding animal' className='img'/> */}

      </header>
    </div>
  );
}

export default App;
