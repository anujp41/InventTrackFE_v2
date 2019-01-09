import React from 'react';
import './Wrapper.css';

const Wrapper = props => {
  return (
    <div className="relative">
      <header>
        <p>InventCount</p>
      </header>
      {props.children}
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default Wrapper;
