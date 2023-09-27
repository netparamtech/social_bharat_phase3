import React from 'react';
import Matrimonial from './subComponents/Matrimonial';
import { Collapse } from 'antd';

const MatrimonialInfo = (props) => {
  const {userDetails} = props;

  const items = [
    {
      key: '1',
      label: 'See Matrimonial Info',
      children: <p><Matrimonial userDetails={userDetails} /></p>,
    },
  ]
 
  return <Collapse items={items} defaultActiveKey={[]}  className='container bg-success col-md-9 w-100 w-lg-75 mt-3' />;
 };

export default MatrimonialInfo;
