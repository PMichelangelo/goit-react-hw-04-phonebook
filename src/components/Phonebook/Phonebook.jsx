import { useState, useEffect, useRef } from 'react';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import ContactsList from './ContactsList/ContactsList';

import styles from './phonebook.module.css';
import { nanoid } from 'nanoid';

const Phonebook = () => {
  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(localStorage.getItem('phonebook'));
    return data || [];
  });
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('phonebook', JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();

    const dublicated = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      return normalizedCurrentName === normalizedName;
    });

    return Boolean(dublicated);
  };

  const addContact = data => {
    if (isDublicate(data.name)) {
      return alert(
        `Contact ${data.name} with tel: ${data.phone} already in phonebook`
      );
    }
    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const changeFilter = ({ target }) => {
    setFilter(target.value);
  };

  const getFiltredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const filtredContacts = contacts.filter(({ name, phone }) => {
      const normalizedName = name.toLowerCase();
      const normalizedPhone = phone.trim();

      return (
        normalizedName.includes(normalizedFilter) ||
        normalizedPhone.includes(normalizedFilter)
      );
    });

    return filtredContacts;
  };

  const items = getFiltredContacts();

  return (
    <div className={styles.phonebookWrapper}>
      <PhonebookForm onSubmit={addContact} />
      <div>
        <input
          type="text"
          name="filter"
          placeholder="Search"
          onChange={changeFilter}
          className={styles.filter}
        />
        <ContactsList items={items} deleteContact={deleteContact} />
      </div>
    </div>
  );
};
/*
class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('phonebook'));
    //if(contacts && contacts.length)
    if (contacts?.length) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('phonebook', JSON.stringify(this.state.contacts));
    }
  }

  isDublicate({ name, phone }) {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    //const normalizedPhone = phone.trim();

    const dublicated = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      //const normalizedCurentPhone = item.phone.trim();
      return (
        normalizedCurrentName === normalizedName
        //normalizedCurentPhone === normalizedPhone
      );
    });

    return Boolean(dublicated);
  }

  addContact = data => {
    if (this.isDublicate(data)) {
      return alert(
        `Contact ${data.name} with tel: ${data.phone} already in phonebook`
      );
    }
    this.setState(({ contacts }) => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return {
        contacts: [...contacts, newContact],
      };
    });

    console.log(data);
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);

      return {
        contacts: newContacts,
      };
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFiltredContacts() {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();
    const filtredContacts = contacts.filter(({ name, phone }) => {
      const normalizedName = name.toLowerCase();
      const normalizedPhone = phone.trim();

      return (
        normalizedName.includes(normalizedFilter) ||
        normalizedPhone.includes(normalizedFilter)
      );
    });

    return filtredContacts;
  }
  render() {
    const { addContact, deleteContact, changeFilter } = this;
    const contacts = this.getFiltredContacts();
    return (
      <div className={styles.phonebookWrapper}>
        <PhonebookForm onSubmit={addContact} />
        <div>
          <input
            type="text"
            name="filter"
            placeholder="Search"
            onChange={changeFilter}
            className={styles.filter}
          />
          <ContactsList items={contacts} deleteContact={deleteContact} />
        </div>
      </div>
    );
  }
}
*/
export default Phonebook;
