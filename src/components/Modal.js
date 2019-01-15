import React from 'react';
import axios from 'axios';
import './Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      count: 0
    };
  }

  render() {
    return (
      <div className="modal-container">
        <div className="modal">
          <span onClick={() => this.props.closeModal(false)}>X</span>
          <input
            className="fruit"
            type="text"
            name="name"
            placeholder="Fruit Name"
            onChange={this.modalChange}
          />
          <input
            className="fruit"
            type="number"
            name="count"
            placeholder="Count"
          />
          <button className="add-button margin-auto">Submit</button>
        </div>
      </div>
    );
  }
}

export default Modal;
