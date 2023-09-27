import React from 'react';
import { Collapse } from 'antd';
import Contact from './subComponents/Contact';

const ContactInfo = (props) => {
  const {userDetails} = props;

  const items = [
    {
      key: '1',
      label: 'See Contact Info',
      children: <p><Contact userDetails={userDetails} /></p>,
    },
  ]
  
 
  return <Collapse items={items} defaultActiveKey={[]}  className='container bg-success col-md-9 w-100 w-lg-75 mt-3' />;
 };

export default ContactInfo;
