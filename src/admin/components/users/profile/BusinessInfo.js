import React from 'react';
import { Collapse } from 'antd';
import Business from './subComponents/Business';

const BusinessInfo = (props) => {
  const {userDetails} = props;

  const items = [
    {
      key: '1',
      label: 'See Business Info',
      children: <p><Business userDetails={userDetails} /></p>,
    },
  ]
 
  return <Collapse items={items} defaultActiveKey={[]}  className='container bg-success col-md-9 w-100 w-lg-75 mt-3' />;
 };

export default BusinessInfo;
