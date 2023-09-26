import React, { useEffect, useState } from "react";
import { fetchOldTestimonials, userFeedback } from "../../services/userService";
import { useNavigate } from "react-router-dom";

const UserRating = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const [data, setData] = useState('');

  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');
  const [alertClass, setAlertClass] = useState('');

  const [defaultImage, setDefaultImage] = useState('https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg');


  const navigate = useNavigate();

  const handleMessageChange = (e) => {
    setComment(e.target.value);
  }

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  }

  const fetchData = async () => {
    try {
      const response = await fetchOldTestimonials();

      setData(response.data.data);

    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/admin');
      }
      else if (error.response && error.response.status === 500) {
        navigate('/admin');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      message: comment,
      rating
    }

    try {
      const response = await userFeedback(data);
      if (response && response.status === 200) {
        setErrors('');
        setMessage(response.data.message);
        setAlertClass('alert-success');

      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
        setMessage('');
        setAlertClass('alert-danger');
      }

      else if (error.response && error.response.status === 401) {
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
      }
      else if (error.response && error.response.status === 500) {
        setMessage(error.response.data.message);
        setAlertClass('alert-danger');
      }
    }
  }

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  useEffect(() => {
    if (message) {
      setComment('');
    }
  }, [message]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div id="rating-authpage">
        <div className="card w-75 mb-5 mx-auto">
          <div className="card-body mx-auto">
            <div className="row">
              <div className="col-12">
                <form onSubmit={handleSubmit}>
                  {message && <div className={`alert ${alertClass}`}>
                    {alertClass === 'alert-success' ? (<i className="fas fa-check-circle"></i>) : (<i className="fas fa-exclamation-triangle"></i>)}
                    {" " + message}
                  </div>
                  }
                  <textarea
                    className="form-control mb-3"
                    placeholder="Comment"
                    id="Textarea"
                    onChange={handleMessageChange}
                    value={comment}
                  ></textarea>
                  <div>{errors.message && <span className='error mb-5'>{errors.message}</span>}</div>

                  <div class="rating mb-3">

                    <input value="5" name="rating" id="star5" type="radio" onChange={handleRatingChange} />
                    <label for="star5"></label>
                    <input value="4" name="rating" id="star4" type="radio" onChange={handleRatingChange} />
                    <label for="star4"></label>
                    <input value="3" name="rating" id="star3" type="radio" onChange={handleRatingChange} />
                    <label for="star3"></label>
                    <input value="2" name="rating" id="star2" type="radio" onChange={handleRatingChange} />
                    <label for="star2"></label>
                    <input value="1" name="rating" id="star1" type="radio" onChange={handleRatingChange} />
                    <label for="star1"></label>
                  </div>
                  {errors.rating && <span className='error'>{errors.rating}</span>}
                  <div className="rating-btn">
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>



              </div>

            </div>
            {/* <div className="row">
              {
                data && data.map((item, idx) => (
                  <div className="col-md-4" key={idx}>
                    <div className="card shadow mb-2">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-4">
                            <img src={item.photo ? item.photo : defaultImage} alt={item.name} title={item.name} className="avatar img-fluid img-circle " />
                          </div>
                          <div className="col-8 user-detail">
                            <p>{item.name}</p>
                            <p>{item.message}</p>
                            <p>Rating-{item.rating}</p>
                            <p>Create-{formatDate(item.created_at)}</p>
                            <p>Update-{formatDate(item.created_at)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }


            </div> */}
          </div>

          <div className="col-md-4">
          <div className="card shadow mb-2">
            <div className="">
              <div className="row">
                <div className="col-4">
                  <img src={data.photo ? data.photo : defaultImage} alt={data.name} title={data.name} className="avatar img-fluid img-circle " />
                </div>
                <div className="col-8 user-detail">
                  <p>{data.name}</p>
                  <p>{data.message}</p>
                  <p>Rating-{data.rating}</p>
                  <p>Create-{formatDate(data.created_at)}</p>
                  <p>Update-{formatDate(data.created_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>

        

      </div>
    </>
  );
};

export default UserRating;
