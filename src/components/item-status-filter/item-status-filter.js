import React, { Component } from 'react'
import { nanoid } from 'nanoid'

import { Filter } from '../../const'

import './item-status-filter.css'

export default class ItemStatusFilter extends Component {
  buttons = [
    {
      name: Filter.ALL,
      label: `All`
    },
    {
      name: Filter.ACTIVE,
      label: `Active`
    },
    {
      name: Filter.DONE,
      label: `Done`
    },
  ]

  render() {
    const { filterSelected, filterHandler } = this.props

    const buttons = this.buttons.map( ( { name: buttonName, label: buttonText } ) => {
      return (
        <button type="button"
          className={ `btn${filterSelected === buttonName ? ` btn-info` : ` btn-outline-secondary`}` }
          onClick={ ( evt ) => { filterHandler( buttonName ) } }
          key={ nanoid() }>
          { buttonText }
        </button>
      )
    } )

    return (
      <div className="btn-group">
        { buttons }
      </div>
    )
  }
}
