import React, { useState } from 'react';
import Column from '../../components/column';
import './style.scss';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const data = [
  {
    id: '1',
    title: 'Inprogress',
  },
  {
    id: '2',
    title: 'Done'
  },
  {
    id: '3',
    title: 'In-review'
  },
  {
    id: '4',
    title: 'Demo'
  },
  {
    id: '5',
    title: 'Testing'
  },
  {
    id: '6',
    title: 'Fix Bug'
  },
];

const listUser = [
  {
    id: '1',
    name: 'Cao Kha Hieu'
  },
  {
    id: '2',
    name: 'Nguyen Quoc Huy',
  }
];

const Home = () => {
  const [list, setList] = useState(data);
  const [inputValue, setInputValue] = useState('');

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...list];

    // remove item in source index
    const [reorderedItem] = items.splice(result.source.index, 1);
    // add item removed to destionation index
    items.splice(result.destination.index, 0, reorderedItem);
    setList(items);
  };

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newList = [...list, {
      id: `${+list[list.length -1].id + 1}`,
      title: inputValue
    }];
    setList(newList);
    setInputValue('');
  };

  const handleDelete = (id) => {
    const indexItem = list.findIndex((item) => item.id === id);
    const newList = [...list];
    newList.splice(indexItem, 1);
    setList(newList);
  };

  return (
    <div className='home-page'>
      <h1>Home Page</h1>
      <form onSubmit={handleSubmit}>
        <input type={'text'} placeholder='Create new section' onChange={handleChangeInput}></input>
        <button>Add</button>
      </form>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters" direction='horizontal'>
          {(provided) => (
            <ul className="list" {...provided.droppableProps} ref={provided.innerRef}>
              {list.map(({id, title}, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li className='column' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Column id={id} title={title} onDelete={handleDelete} listUser={listUser} />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Home;