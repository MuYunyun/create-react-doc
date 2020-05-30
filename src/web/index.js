/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
// eslint-disable-next-line import/no-named-as-default
import RouterRoot from './Router';

ReactDOM.render(
  <RouterRoot />,
  document.getElementById('root')
);

