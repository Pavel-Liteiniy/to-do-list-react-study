import React, {Component} from 'react'

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'

import './app.css'

const EventType = {
  DELETE: `delete`,
}

const deleteItem = (items, index) => {
  if (index === -1) {
    return items
  }

  return [
    ...items.slice(0, index),
    ...items.slice(index + 1)
  ]
}

export default class App extends Component {
  state = {
    tasks: this.props.data,
  }

  render() {
    return (
      <div className="todo-app">
        <AppHeader toDo={ 1 } done={ 3 } />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList 
          tasks={ this.state.tasks }
          appEventHandler={ (type, data) => this._updateTasks(type, data) } />
      </div>
    )
  }
  
  _updateTasks = (type, data) => {
    switch (type) {
      case EventType.DELETE:
        this.setState(({tasks}) => {
          const index = tasks.findIndex((task) => {
            return task.id === data
          })

          const updatedTasks = deleteItem(tasks, index)

          return {tasks: updatedTasks}
        })
        break
    }
  }
}
