import React, { Component } from 'react'

import './todo-list-item.css'

const ListItemState = {
  DEFAULT: `todo-list-item`,
  IMPORTANT: `important`,
  DONE: `done`,
}

export default class TodoListItem extends Component {
  render() {
    const { label, listItemEventHandler: eventHandler, important = false, done = false } = this.props

    let labelClassList = ListItemState.DEFAULT

    if ( important ) {
      labelClassList += ` ${ListItemState.IMPORTANT}`
    }

    if ( done ) {
      labelClassList += ` ${ListItemState.DONE}`
    }

    return (
      <div className={ labelClassList }>
        <span
          className="todo-list-item-label"
          onClick={ () => eventHandler( `update`, { done: !done } ) }>
          { label }
        </span>

        <button type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={ () => eventHandler( `update`, { important: !important } ) }>
          <i className="fa fa-exclamation" />
        </button>

        <button type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={ () => eventHandler( `delete` ) }>
          <i className="fa fa-trash-o" />
        </button>
      </div>
    )
  }
}
