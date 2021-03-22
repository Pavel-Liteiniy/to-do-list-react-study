import React from 'react'

import './search-panel.css'

const SearchPanel = ( { searchRequest, searchHandler } ) => {
  return (
    <input type="text"
      className="form-control search-input"
      placeholder="type to search"
      onChange={ ( evt ) => searchHandler( evt.target.value ) }
      value={ searchRequest } />
  )
}

export default SearchPanel
