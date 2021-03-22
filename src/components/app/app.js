import React, { Component } from 'react'

import { EventType, Filter } from '../../const'

import AppHeader from '../app-header'
import SearchPanel from '../search-panel'
import TodoList from '../todo-list'
import ItemStatusFilter from '../item-status-filter'
import AddItemPanel from '../add-item-panel'
import './app.css'

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
    filterSelected: Filter.ALL,
    searchRequest: ``,
  }

  render() {
    const { tasks: unfilteredTasks, filterSelected, searchRequest } = this.state;
    const filteredTasks = this._filterTasks( unfilteredTasks );


    return (
      <div className="todo-app">
        <AppHeader toDo={ unfilteredTasks.length } done={ this._getDoneTaskCount( unfilteredTasks ) } />
        <div className="top-panel d-flex">
          <SearchPanel
            searchRequest={ searchRequest }
            searchHandler={ ( newSearchRequest ) => { this._changeSearchRequest( newSearchRequest ) } } />
          <ItemStatusFilter
            filterSelected={ filterSelected }
            filterHandler={ ( newfilterType ) => { this._changeFilterType( newfilterType ) } } />
        </div>
        <TodoList
          tasks={ filteredTasks }
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

  _changeFilterType = ( newfilterType ) => {
    this.setState( { filterSelected: newfilterType } )
  }

  _changeSearchRequest = ( newSearchRequest ) => {
    this.setState( { searchRequest: newSearchRequest } )
  }

  _filterTasks = ( tasks ) => {
    return tasks.filter( ( task ) => {
      const { filterSelected, searchRequest } = this.state

      if ( searchRequest.length > 0 && !task.label.toLowerCase().includes( searchRequest.toLowerCase() ) ) {
        return false
      }

      switch ( filterSelected ) {
        case Filter.ALL:
          return true
        case Filter.ACTIVE:
          return !task.done
        case Filter.DONE:
          return task.done
        default:
          return true
      }
    } )
  }

  _getDoneTaskCount( tasks ) {
    let doneTaskCount = 0;

    tasks.forEach( task => {
      if ( task.done ) {
        doneTaskCount++
      }
    } )

    return doneTaskCount
  }
}
