import React from 'react';
import { CardTitle } from 'react-bootstrap';

function Loader() {
 
  return (
    <div className="ripple__container">
      <div className="ripple__box">
        <div className="spinner-chase">
          <div className="chase-dot" key="r-1-1" />
          <div className="chase-dot" key="r-1-2" />
          <div className="chase-dot" key="r-1-3" />
          <div className="chase-dot" key="r-1-4" />
          <div className="chase-dot" key="r-1-5" />
          <div className="chase-dot" key="r-1-6" />
        </div>
        <div className="padding-top-30">
          <CardTitle>
            Loader
          </CardTitle>
        </div>
      </div>
    </div>

  );
}

export default Loader
