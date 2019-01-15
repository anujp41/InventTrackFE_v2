import React from 'react';
import './Modal.css';

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
          <span onClick={() => this.props.closeModal(false)}>X</span>
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

export default Modal;
