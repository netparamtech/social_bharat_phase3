import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import UserRating from '../userRating/UserRating';
import { useDispatch } from 'react-redux';
import { setModelAction } from '../../actions/loaderAction';

const FeedbackModel = () => {
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();
  const handleModelShow = () =>{
    setVisible(false);
    dispatch(setModelAction(false));
  }

  return (
    <>
     
      <Modal
        title="FEEDBACK"
        centered
        open={visible}
        onOk={() => handleModelShow()}
        onCancel={() => handleModelShow()}
        width={1000}
        
      >
       <div>
        <UserRating />
       </div>
      </Modal>
    </>
  );
};

export default FeedbackModel;