import React from "react";

const UserRating = () => {
  return (
    <>
      <div id="rating-authpage">
        <div className="card w-75 mb-5 mx-auto">
          <div className="card-body mx-auto">
            <div className="row">
              <div className="col-12">
                <div class="rating">
                  <input value="5" name="rating" id="star5" type="radio" />
                  <label for="star5"></label>
                  <input value="4" name="rating" id="star4" type="radio" />
                  <label for="star4"></label>
                  <input value="3" name="rating" id="star3" type="radio" />
                  <label for="star3"></label>
                  <input value="2" name="rating" id="star2" type="radio" />
                  <label for="star2"></label>
                  <input value="1" name="rating" id="star1" type="radio" />
                  <label for="star1"></label>
                </div>
              </div>
              <div className="rating-btn">
                <a className="btn btn-primary" name="Submit">
                  Submit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRating;
