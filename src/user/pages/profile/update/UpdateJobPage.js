import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getSingleJobDetails } from '../../../services/userService';
import UpdateJobProfile from '../../../components/ProfilePage/UpdateJobProfile';
import UserLayout from '../../../layouts/UserLayout';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/userAction';

const UpdateJobPage = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  const dispatch = useDispatch();

  const fetchJob = async (id) => {
    try {
      const response = await getSingleJobDetails(id);
      if (response && response.status === 200) {
        setJobDetails(response.data.data);
      }
    } catch (error) {
      //Unauthorized
      if (error.response && error.response.status === 401) {
        dispatch(logout());
        window.location.href = '/login';
      } else if (error.response && error.response.status === 500) {
        dispatch(logout());
        window.location.href = '/login';
      }
    }

  }
  useEffect(() => {
    if (id) {
      fetchJob(id);
    }
  }, [id]);
  return (
    <UserLayout>
      <UpdateJobProfile jobDetails={jobDetails} />
    </UserLayout>
  );
};

export default UpdateJobPage;