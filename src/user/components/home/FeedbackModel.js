import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { setModelAction } from '../../actions/loaderAction';
import UserRatingModel from '../userRating/userRatingModel';

const FeedbackModel = () => {
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();
  const handleModelShow = () =>{
    console.log("Hello")
    setVisible(!visible);
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
        footer={[]}
        style={{backgroundColor:'green'}}
      >
       <div className='bg-success'>
        <UserRatingModel />
       </div>
      </Modal>
    </>
  );
};

export default FeedbackModel;