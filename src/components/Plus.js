import React from 'react';
import './Plus.css';

const Plus = ({ addModal }) => (
  <div className="plus">
    <div className="icon" />
    <div className="fruit-add" onClick={() => addModal('fruit')} />
    <div className="user-add" onClick={() => addModal('user')} />
  </div>
);

export default Plus;
