// components/Loading.js
import React from 'react';
import './Loading.css'; // Import CSS for styling

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner-container">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
