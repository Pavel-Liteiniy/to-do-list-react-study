import React from 'react'

import TodoListItem from '../todo-list-item'
import './todo-list.css'

const TodoList = ( { tasks, appEventHandler: eventHandler } ) => {

  const elements = tasks.map( ( task ) => {
    const { id, ...taskProps } = task

    return (
      <li key={ id } className="list-group-item">
        <TodoListItem
          { ...taskProps }
          listItemEventHandler={ ( type ) => eventHandler( type, id ) } />
      </li>
    )
  } )

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  )
}

export default TodoList
