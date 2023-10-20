import React, { useEffect, useState } from 'react';

const MatrimonialInfo = (props) => {
  const { userDetails } = props;
  const matrimonialDetails = userDetails?.data?.matrimonial;
  const proposalPhotos = userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].proposal_photos;
  const [brotherDetails, setBrotherDetails] = useState('');
  const [sisterDetails, setSisterDetails] = useState('');

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
  useEffect(() => {
    setBrotherDetails(userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].brothers_details);
    setSisterDetails(userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].sisters_details);
  }, [userDetails]);

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);

  return (
    <div>
      <div id="auth-wrapper" className="pt-3 pb-4">
        <div id="matrimonial-info" className="container">
          <div className="card shadow" id='font-Resize'>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 ">
                  <div className="card-title">
                    <h5 className="mb-3 text-primary">Matrimonial Info</h5>
                  </div>
                  {userDetails && userDetails.data && userDetails.data.matrimonial[0] ? (
                    <form className="p-3 mb-3 ">
                      <div className="row">
                        <div className="mb-3 col-md-6  col-sm-12 col-xs-12">
                          <div className="row">
                            <div className="col-md-4">
                              <label className="fw-bold">Father Name :</label>
                            </div>
                            <div className="col-md-8">
                              <label className="">{userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].father_name||"N/A"}</label>
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
                                {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].mother_name||"N/A"}
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
                                {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].skin_tone||"N/A"}
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
                                {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].height_in_feet||"N/A"}
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
                                Brother Count :
                              </label>
                            </div>
                            <div className="col-md-8">
                              <label className="">
                                {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].brother_count||"N/A"}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <div className="row">
                            <div className="col-md-4">
                              <label htmlFor="status" className="fw-bold">
                                Sister Count :
                              </label>
                            </div>
                            <div className="col-md-8">
                              <label className="">
                                {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].sister_count||"N/A"}
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
                                    Brother Details :
                                  </label>
                                </div>
                                <div className="col-md-8">
                                  <label className="">
                                    {brotherDetails||"N/A"}
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                              <div className="row">
                                <div className="col-md-4">
                                  <label htmlFor="status" className="fw-bold">
                                    Sister Details :
                                  </label>
                                </div>
                                <div className="col-md-8">
                                  <label className="">
                                    {sisterDetails||"N/A"}
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
                                Manglik :
                              </label>
                            </div>
                            <div className="col-md-8">
                              <label className="">
                                {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].manglik||"N/A"}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <div className="row">
                            <div className="col-md-4">
                              <label htmlFor="status" className="fw-bold">
                                Package :
                              </label>
                            </div>
                            <div className="col-md-8">
                              <label className="">
                                {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].salary_package||"N/A"}
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
                                Paternal Gotra :
                              </label>
                            </div>
                            <div className="col-md-8">
                              <label className="">
                                {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].paternal_gotra||"N/A"}                          </label>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <div className="row">
                            <div className="col-md-4">
                              <label htmlFor="status" className="fw-bold">
                                Maternal Gotra:
                              </label>
                            </div>
                            <div className="col-md-8">
                              <label className="">
                                {userDetails && userDetails.data && userDetails.data.matrimonial[0] && userDetails.data.matrimonial[0].maternal_gotra||"N/A"}
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
                                    <a href={userDetails.data.matrimonial[0].biodata} download="biodata.pdf" target="_blank">
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
                  ) : (
                    <div className="col-md-12">
                      <p className="mb-3 font-14">No Matrimonial Details available.</p>
                    </div>
                  )
                  }

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
