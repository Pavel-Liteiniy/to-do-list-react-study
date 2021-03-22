import React, { Component } from 'react'
import { nanoid } from 'nanoid'

import { EventType } from '../../const'

import './add-item-panel.css'

export default class AddItemPanel extends Component {
  state = {
    label: ``
  }

  _callback = {
    submit: this.props.appEventHandler
  }

  render() {
    return (
      <form
        className='item-add-form d-flex'
        onSubmit={ this._onAddItemPanelSubmit }>

        <input type='text'
          className='form-control'
          onChange={ this._onLabelChange }
          placeholder='type to add task'
          value={ this.state.label }
          required />

        <button
          type='submit'
          className='btn btn-outline-secondary'>
          Add&nbsp;task
        </button>

      </form>
    )
  }

  _onLabelChange = ( evt ) => {
    this.setState( { label: evt.target.value } )
  }

  _addTask = ( { label } ) => {
    return {
      id: nanoid(),
      label,
      important: false,
    }
  }

  _onAddItemPanelSubmit = ( evt ) => {
    evt.preventDefault()
    this._callback.submit( EventType.ADD, this._addTask( this.state ) )

    this.setState( { label: `` } )
  }
}
