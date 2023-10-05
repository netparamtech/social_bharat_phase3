import React from 'react';

const MatrimonialInfo = (props) => {
  const { userDetails } = props;
  const matrimonialDetails = userDetails?.data?.matrimonial;
  const proposalPhotos = userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].proposal_photos;

  const getFileType = (url) => {
    // Extract the file extension from the URL
    const extension = url.split('.').pop().toLowerCase();

    // Define mappings of common file types
    const fileTypeMappings = {
      pdf: 'PDF',
      doc: 'DOC',
      docx: 'DOCX',
      txt: 'TXT',
      // Add more file types as needed
    };
    // Use the mapping or show the extension as-is
    return fileTypeMappings[extension] || extension.toUpperCase();
  };
  return (
    <div>
      <div id="auth-wrapper" className="pt-5 pb-5 mt-2">
        <div id="event-info" className="container">
          <div className="card shadow">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 ">
                  <div className="card-title">
                    <h3 className="mb-3 fw-bold fs-5">Matrimonial Info</h3>
                  </div>
                  <form className="p-3">
                    <div className="row">
                      <div className="mb-3 col-md-6  col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="fw-bold">Father Name :</label>
                          </div>
                          <div className="col-md-8">
                            <label className="">{userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].father_name}</label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="fw-bold">Mother Name :</label>
                          </div>
                          <div className="col-md-8">
                            <label className="">
                              {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].mother_name}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="fw-bold">
                              Skin Tone :
                            </label>
                          </div>
                          <div className="col-md-8">
                            <label className="">
                              {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].skin_tone}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 col-md-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label className="fw-bold">Height :</label>
                          </div>
                          <div className="col-md-8">
                            <label className="">
                              {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].height_in_feet}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="status" className="fw-bold">
                              Weight :
                            </label>
                          </div>
                          <div className="col-md-8">
                            <label className="">
                              {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].weight_in_kg}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="status" className="fw-bold">
                              Paternal Gotra :
                            </label>
                          </div>
                          <div className="col-md-8">
                            <label className="">
                              {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].paternal_gotra}                          </label>
                          </div>
                        </div>
                      </div>


                    </div>

                    <div className="row">
                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="status" className="fw-bold">
                              Maternal Gotra :
                            </label>
                          </div>
                          <div className="col-md-8">
                            <label className="">
                              {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].maternal_gotra}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="status" className="fw-bold">
                              Biodata :
                            </label>
                          </div>
                          <div className="col-md-8">
                            <label className="">
                              {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].biodata && (
                                <span>
                                  <a href={userDetails.data.matrimonial[0].biodata} download="biodata.pdf">
                                    <i className="fa-regular fa-file-lines"></i> Download Biodata
                                  </a>
                                  &nbsp;({getFileType(userDetails.data.matrimonial[0].biodata)})
                                </span>
                              )}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <div className="row">
                            <div className="col-md-4">
                              <label htmlFor="status" className="fw-bold">
                                Proposal Photos :
                              </label>
                            </div>
                            <div className="col-md-8">
                              <label className="proposal-Photo">
                                {
                                  proposalPhotos && Array.isArray(proposalPhotos) ? (proposalPhotos.map((item, idx) => (
                                    <a href={item} target='_blank'>
                                    <img className='m-1' src={item} /> </a>
                                  ))) : (
                                    <a href={proposalPhotos} target='_blank'>
                                  <img src={proposalPhotos} />
                                  </a>
                                  )
                                }
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>





                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrimonialInfo;
