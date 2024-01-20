import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './phonebookForm.module.css';

class PhonebookForm extends Component {
  nameId = nanoid();
  phoneId = nanoid();

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({
      name: '',
      phone: '',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  state = {
    name: '',
    phone: '',
  };
  render() {
    const { nameId, phoneId, handleSubmit, handleChange } = this;
    const { name, phone } = this.state;
    return (
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formWrapper}>
            <label htmlFor={nameId}>Name</label>
            <input
              value={name}
              type="text"
              name="name"
              placeholder="Name"
              className={styles.inputName}
              id={nameId}
              onChange={handleChange}
              required
            />
            <label htmlFor={phoneId}>Phone</label>
            <input
              value={phone}
              type="tel"
              name="phone"
              placeholder="Phone"
              className={styles.inputName}
              id={phoneId}
              onChange={handleChange}
              required
            />
            <button type="submit" className={styles.addContactBtn}>
              Add contact
            </button>
          </div>
        </form>
        <h1>Contacts</h1>
      </div>
    );
  }
}

export default PhonebookForm;
