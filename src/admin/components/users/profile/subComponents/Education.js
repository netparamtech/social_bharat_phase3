const Education = (props) => {
  const {userDetails} = props;
  const educationDetails = userDetails&&userDetails.data&&userDetails.data.education;

  console.log("Hello",educationDetails)

  return (
    <div id="education-section" className="content-wrapper pt-4">
      <div className="container">
        <div className="">
          <div className="">
            <div className="row">
            {educationDetails && educationDetails.length > 0 ? (
                educationDetails.map((item, idx) => (
              <div className="col-md-6">
                <div className="card shadow mt-2">
                  <div className="card-body">
                    <div className="w-100 w-lg-75">
                      <div className="mb-2 row">
                        <label htmlFor="" className="col-sm-3 d-inline-flex">Degree</label>
                        <div className="col-sm-8"><span className="text-muted">{item.degree_title}</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Study Field</label>
                        <div className="col-sm-8"><span className="text-muted">{item.field_of_study}</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">University</label>
                        <div className="col-sm-8"><span className="text-muted">{item.institution_name}</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Score</label>
                        <div className="col-sm-8"><span className="text-muted">{item.score}</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Score Type</label>
                        <div className="col-sm-8"><span className="text-muted">{item.score_type}</span></div>
                      </div>
                      <div className="mb-2 row">
                        <label className="col-sm-3">Passing Year</label>
                        <div className="col-sm-8"><span className="text-muted">{item.passing_year}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            )) ) : (
              <div className="col-md-12">
                <p className="text-muted">No education details available.</p>
              </div>
            )}
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
