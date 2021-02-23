import React, { Component } from 'react'

import './todo-list-item.css'

const ListItemState = {
  DEFAULT: `todo-list-item`,
  IMPORTANT: `important`,
  DONE: `done`,
}

export default class TodoListItem extends Component {
  state = {
    done: false,
    important: this.props.important,
  }

  render() {
    const { label, listItemEventHandler: eventHandler } = this.props
    const { important = false, done = false } = this.state

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
          onClick={ this._onLabelClick }>
          { label }
        </span>

        <button type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={ this._onImportantButtonClick }>
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

  _onLabelClick = () => {
    this.setState( ( { done } ) => {
      return { done: !done }
    } )
  }

  _onImportantButtonClick = () => {
    this.setState( ( { important } ) => {
      return { important: !important }
    } )
  }
}
