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

const Home = () => {
  const [list, setList] = useState(data);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...list];
    
    // remove item in source index
    const [reorderedItem] = items.splice(result.source.index, 1);
    // add item removed to destionation index
    items.splice(result.destination.index, 0, reorderedItem);
    setList(items);
  };

  return (
    <div className='home-page'>
      <h1>Home Page</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters" direction='horizontal'>
          {(provided) => (
            <ul className="list" {...provided.droppableProps} ref={provided.innerRef}>
              {list.map(({id, title}, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li className='column' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Column title={title} />
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