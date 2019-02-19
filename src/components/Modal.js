import React, { useState } from 'react';
import './Modal.css';

const Modal = props => {
  const [detail, setDetail] = useState({ name: '', count: 0 });
  console.log('props ', props);
  const updateState = (name, value) => {
    setDetail[name] = value;
  };

  const handleSubmit = () => console.log('i will submit');

  const renderUserInput = () => (
    <input
      className="fruit"
      type="number"
      name="name"
      placeholder="Count"
      value={detail.name}
      onChange={updateState}
    />
  );

  const renderFruitInput = () => (
    <>
      <input
        className="fruit"
        type="text"
        name="name"
        placeholder="Fruit Name"
        value={detail.name}
        onChange={updateState}
      />
      <input
        className="fruit"
        type="number"
        name="count"
        placeholder="Count"
        value={detail.count}
        onChange={updateState}
      />
    </>
  );
  return (
    <div className="modal-container">
      <div className="modal">
        <span onClick={() => props.addModal('', false)}>X</span>
        {props.modalType === 'user' ? renderUserInput() : renderFruitInput()}
        <button className="add-button margin-auto" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

/*
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      fruit: '',
      count: ''
    };
  }
  handleChange(event) {
    const {
      target: { name, value }
    } = event;
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSave(this.state);
  }
  render() {
    const { fruit, count } = this.state;
    return (
      <div className="modal-container">
        <div className="modal">
          <span onClick={() => this.props.addModal('', false)}>X</span>
          <input
            className="fruit"
            type="text"
            name="fruit"
            placeholder="Fruit Name"
            value={fruit}
            onChange={this.handleChange}
          />
          <input
            className="fruit"
            type="number"
            name="count"
            placeholder="Count"
            value={count !== '' ? count : ''}
            onChange={this.handleChange}
          />
          <button
            className="add-button margin-auto"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
*/

export default Modal;
