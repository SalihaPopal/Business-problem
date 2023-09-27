import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SessionListing() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get('https://business-problem-city-farm-server.onrender.com/Sessions')
      .then((response) => {
        setSessions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sessions:', error);
      });
  }, []);

  const claimSession = (Session_id) => {
    axios.post(`https://business-problem-city-farm-server.onrender.com/Sessions/${Session_id}/claim`)
      .then(() => {
        setSessions((prevSessions) => {
          return prevSessions.map((session) => {
            if (session.id === Session_id) {
              return { ...session, claimed: true };
            }
            return session;
          });
        });
      })
      .catch((error) => {
        console.error('Error claiming session:', error);
      });
  };

  return (
    <div>
      <h2>Available Sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            {session.date}, {session.time}
            {!session.claimed ? (
              <button className='signupBtn' onClick={() => claimSession(session.id)}>Claim</button>
            ) : (
              <span>Claimed</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SessionListing;
