import React from 'react';
import './Counter.css';
import TotalCount from './TotalCount';
import UserCount from './UserCount';
import Remaining from './Remaining';

const Counter = props => {
  const { handleMsg, ...userProps } = props; //extracts handleMsg as not needed in TotalCount
  return (
    <div className="container">
      <TotalCount {...userProps} />
      <UserCount {...props} />
      <Remaining socket={props.socket} />
    </div>
  );
};

export default Counter;
