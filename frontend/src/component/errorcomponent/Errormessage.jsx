import React from 'react';
import './errormessage.css'; // Import the CSS styling file

const ErrorComponent = ({ error }) => {
  return (
    <div className="error-container">
      <div className="error-message">
        <p className="error-details">{error}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
