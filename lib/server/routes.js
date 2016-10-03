import renderReact from './render-react';
import IndexComponent from './view/IndexComponent';
import React from 'react';

export function* index(context) {
  return Object.assign({}, context, {
    body: renderReact(<IndexComponent/>)
  });
}
