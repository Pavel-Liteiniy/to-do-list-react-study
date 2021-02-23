import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

const tasks = [
  { label: 'Drink Coffee', important: false, id: 1 },
  { label: 'Make Awesome App', important: true, id: 2 },
  { label: 'Have a lunch', important: false, id: 3 }
];

ReactDOM.render( <App data={ tasks.slice() } />,
  document.getElementById( 'root' ) );
