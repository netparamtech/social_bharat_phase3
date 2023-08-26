import React, { useState } from 'react';
import UserLayout from '../layouts/UserLayout';
import UpdateJobProfile from '../components/ProfilePage/UpdateJobProfile';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleJobDetails } from '../services/userService';
import { decode } from '../encryt/encode';
import { useEffect } from 'react';

const UpdateJobPage = () => {
  const { id } = useParams();
  const [jobDetails,setJobDetails] = useState(null);

  const navigate = useNavigate();

  const fetchJob = async (id) => {
    try{
      const response = await getSingleJobDetails(id);
      if (response && response.status === 200) {
        setJobDetails(response.data.data);
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }

  }
  useEffect(()=>{
   if(id){
    fetchJob(decode(id));
   }
  },[id]);
  return (
    <UserLayout>
      <UpdateJobProfile jobDetails = {jobDetails} />
    </UserLayout>
  );
};

export default UpdateJobPage;