import React from 'react';
import spinner from './spinner.gif';

const Spinner = ({ size = 200 }) => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: `${size}px`, margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;
