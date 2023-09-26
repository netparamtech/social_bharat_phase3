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
  const onChange = (key) => {
    console.log(key);
  };
  return <Collapse items={items} defaultActiveKey={[]} onChange={onChange} className='container bg-success col-md-9 w-100 w-lg-75 mt-3' />;
 };

export default MatrimonialInfo;
