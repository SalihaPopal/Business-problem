import React from 'react';
import './handler.css'
import { Link } from 'react-router-dom';

function handler() {
  return (
    <div>
      <Link to="/form">
        <button className="apply-button">Apply</button>
      </Link>
    </div>
  )
}

export default handler;




