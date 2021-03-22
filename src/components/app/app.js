import React, { Component } from 'react'
import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'
import AddItemPanel from '../add-item-panel'
import './app.css'
const EventType = {
  DELETE: `delete`,
  ADD: `add`,
  UPDATE: `update`,
}
const deleteItem = ( items, index ) => {
  if ( index === -1 ) {
    return items
  }
  return [
    ...items.slice( 0, index ),
    ...items.slice( index + 1 )
  ]
}

const updateItem = ( items, update, index ) => {
  if ( index === -1 ) {
    return items
  }

  return [
    ...items.slice( 0, index ),
    update,
    ...items.slice( index + 1 )
  ]
}

export default class App extends Component {
  state = {
    tasks: this.props.data,
  }

  render() {
    const { tasks } = this.state;
    return (
      <div className="todo-app">
        <AppHeader toDo={ tasks.length } done={ this._getDoneTaskCount( tasks ) } />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList
          tasks={ tasks }
          appEventHandler={ ( type, data ) => this._updateTasks( type, data ) } />
        <AddItemPanel
          appEventHandler={ ( type, data ) => this._updateTasks( type, data ) } />
      </div>
    )
  }

  _updateTasks = ( type, data ) => {
    switch ( type ) {
      case EventType.DELETE:
        this.setState( ( { tasks } ) => {
          const index = tasks.findIndex( ( task ) => {
            return task.id === data.id
          } )
          const updatedTasks = deleteItem( tasks, index )
          return { tasks: updatedTasks }
        } )
        break
      case EventType.ADD:
        this.setState( ( { tasks } ) => {
          const updatedTasks = [ ...tasks, data ]
          return { tasks: updatedTasks }
        } )
        break
      case EventType.UPDATE:
        this.setState( ( { tasks } ) => {
          const index = tasks.findIndex( ( task ) => {
            return task.id === data.id
          } )
          const updatedTasks = updateItem( tasks, data, index )
          return { tasks: updatedTasks }
        } )
        break
    }
  }

  _getDoneTaskCount( tasks ) {
    let doneTaskCount = 0;

    tasks.forEach( task => {
      if ( `done` in task && task.done ) {
        doneTaskCount++
      }
    } )

    return doneTaskCount
  }
}
