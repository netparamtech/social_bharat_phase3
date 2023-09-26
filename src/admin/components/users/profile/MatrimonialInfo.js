import React from 'react';
import Matrimonial from './Matrimonial';
import { Collapse } from 'antd';

const items = [
  {
    key: '1',
    label: 'See Matrimonial Info',
    children: <p><Matrimonial /></p>,
  },
]

const MatrimonialInfo = () => {
 
  return <Collapse items={items} defaultActiveKey={[]}  className='container bg-success col-md-9 w-100 w-lg-75 mt-3' />;
 };

export default MatrimonialInfo;
