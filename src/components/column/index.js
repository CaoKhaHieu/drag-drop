import React, { useEffect, useState } from 'react';
import './style.scss';

const Column = (props) => {
  const { id, title, onDelete, listUser } = props;
  const [inputSeacrh, setInputSearch] = useState('');
  const [data, setData] = useState(listUser);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    if (inputSeacrh !== '') {
      const newList = [...listUser].filter(item => (
        item.name.toLowerCase().includes(inputSeacrh) && item
      ))
      setData(newList);
    } else {
      setData(listUser);
    }
  }, [inputSeacrh]);

  const handleChangeInput = (e) => {
    setInputSearch(e.target.value);
  };

  const handleClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
      <h3 className='column-title'>{title}</h3>

      <form className='form-search'>
        <input className='seacrh-input' type={'text'} placeholder='search...' onChange={handleChangeInput} ></input>
      </form>
      <ul className='list-user'>
        {
          data.map((item) => (
            <li className={`user-item ${selectedUser?.id === item.id && 'active'}`} key={item.id} onClick={() => handleClick(item)}>{item.name}</li>
          ))
        }
      </ul>

      <button onClick={() => onDelete(id)}>Delete</button>
    </>
  );
};

export default Column;