import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOldTestimonials } from '../../services/userService';
import { Card, Row, Col } from 'antd'; // Importing Card, Row, and Col components from Ant Design

const FetchAllFeedback = () => {
  const [data, setData] = useState('');
  const [rating, setRating] = useState('');
  const navigate = useNavigate();
  const [defaultImage, setDefaultImage] = useState('https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg');

  const fetchData = async () => {
    try {
      const response = await fetchOldTestimonials();

      setData(response.data.data);
      setRating(response.data.data.rating);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else if (error.response && error.response.status === 500) {
        navigate('/login');
      }
    }
  };

  const generateRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i} className="fa fa-star checked"></span>);
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const calculateTimeDifference = (updatedDate) => {
    const currentDate = new Date();
    const updatedDateObj = new Date(updatedDate);
    const differenceInSeconds = Math.floor((currentDate - updatedDateObj) / 1000);

    if (differenceInSeconds < 1) {
      return 'now';
    } else if (differenceInSeconds < 60) {
      return `${differenceInSeconds} sec ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} min ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} hour ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} day ago`;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div id="rating-authpage" className='mt-1'>
        <Card className="w-75 mb-5 mx-auto" style={{ textAlign: 'left',lineHeight:"0.1" }}>
          <div className="card-body text-secondary row">
            <Col span={3}>
              <img src={data.photo ? data.photo : defaultImage} alt={data.name} title={data.name} width={50} className="avatar img-fluid img-circle " />
            </Col>
            <Col span={6}>
              <Row>
                <p>{data.name}</p>
              </Row>
              <Row style={{fontSize:'55%'}}>
              <p>{generateRatingStars(data.rating)}</p>
              </Row>

              <Row>
                <p style={{ fontFamily: 'Arial', fontStyle: 'italic' }}>
                  &ldquo;{data.message}&rdquo;
                </p>
              </Row>
            </Col>
            <Col span={3}>
            <p>{calculateTimeDifference(data.updated_at)}</p>
            </Col>
          </div>
        </Card>
      </div>
    </>
  );
};

export default FetchAllFeedback;
