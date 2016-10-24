import React from 'react';
import Activity from './Activity';

const Index = (props) => (
  <Activity now={props.now} activity={props.activity} />
);

export default Index;
