import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import readData from './ReadData';
import storeData from './StoreData';

const App = () => {
  const [otp, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const dataFromFirebase = await readData();
      setData(dataFromFirebase);
    };
    fetchData();
  }, []);
  
 
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (latitude, longitude) => {
    storeData(latitude, longitude);
  };

 

  const fetchGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        handleSubmit(position.coords.latitude, position.coords.longitude);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
   
    fetchGeolocation();
  }, []);

  return (
    <div className="container">
      <div className="content">
        <div className="card">
          <h2 className="card-title">otp</h2>
          <p className="coordinates">Your otp is: {otp}</p>
         
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

