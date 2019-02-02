import React from 'react';
import './Counter.css';
import TotalCount from './TotalCount';
import UserCount from './UserCount';

const Counter = props => {
  return (
    <div className="container">
      <TotalCount {...props} />
      <UserCount />
    </div>
  );
};

export default Counter;
