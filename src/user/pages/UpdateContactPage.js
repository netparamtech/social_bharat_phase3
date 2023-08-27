import React, { useEffect, useState } from 'react';
import UserLayout from '../layouts/UserLayout';
import UpdateContact from '../components/ProfilePage/UpdateContact';
import { getSingleContactDetails } from '../services/userService';
import { useNavigate, useParams } from 'react-router-dom';
import { decode } from '../encryt/encode';



const UpdateContactPage = () => {
    const { id } = useParams();
    const [contactDetails,setContactDetails] = useState(null);
  
    const navigate = useNavigate();
  
    const fetchJob = async (id) => {
      try{
        const response = await getSingleContactDetails(id);
        if (response && response.status === 200) {
          setContactDetails(response.data.data);
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
      fetchJob(id);
     }
    },[id]);
return (
        <UserLayout>
            <UpdateContact contactDetails = {contactDetails} />
        </UserLayout>
);
};

export default UpdateContactPage;