import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';

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
          appEventHandler={ (type, id) => console.log(type, id) } />
      </div>
    )
  }
}
