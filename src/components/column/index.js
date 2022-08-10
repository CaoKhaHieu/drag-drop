import React from 'react';
import './style.scss';

const Column = (props) => {
  const { title } = props;
  return (
    <>
      <h3 className='column-title'>{title}</h3>
    </>
  );
};

export default Column;