import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import FlatRentBanner from './banner/FlatRentBanner';
const FlatRentServiceBannerDrawer = ({items}) => {
  const [open, setOpen] = useState(false);
  const [data,setData] = useState('');
  return (
    <>
      <Button type="primary" onClick={() => {
        setOpen(true);

      }}>
            VIEW MORE
      </Button>
      <Modal
        title="Find Your Perfect Room, Flat, or PG"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        footer={[]}
      >
       <FlatRentBanner items = {items} />
      </Modal>
    </>
  );
};
export default FlatRentServiceBannerDrawer;