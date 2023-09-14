import React, { useEffect, useState } from 'react';
import UserLayout from '../../../layouts/UserLayout';
import UpdateBusinessProfile from '../../../components/ProfilePage/UpdateBusinessProfile';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBusinessByID } from '../../../services/userService';

const UpdateBusinessPage = () => {
  const { id } = useParams();
  const [businessDetails, setBusinessDetails] = useState(null);
  const navigate = useNavigate();

  const fetchBusiness = async (id) => {
          try {
                  const response = await fetchBusinessByID(id);
                  if (response && response.status === 200) {
                          setBusinessDetails(response.data.data);
                  }
          } catch (error) {
                  //Unauthorized
                  if (error.response && error.response.status === 401) {
                          navigate('/login');
                  }
                  //Internal Server Error
                  else if (error.response && error.response.status === 500) {
                          navigate('/login');
                  }
          }

  }
  useEffect(() => {
          if (id) {
                  fetchBusiness(id);
          }
  }, [id]);
  return (
    <UserLayout>
      <UpdateBusinessProfile businessDetails = {businessDetails} />
    </UserLayout>
  );
};

export default UpdateBusinessPage;