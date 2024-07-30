import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSelfMatrimonialById } from '../../../services/AdminService';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../../actions/loaderAction';

const MatrimonialInfo = (props) => {
  const { userDetails } = props;
  const id = userDetails?.data?.id;
  const [proposalPhotos, setProposalPhotos] = useState([]);
  const [brotherDetails, setBrotherDetails] = useState('');
  const [sisterDetails, setSisterDetails] = useState('');

  const [matrimonial, setMatrimonial] = useState('');
  const [serverError, setServerError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const getSelfMatrimonial = async (id) => {
    dispatch(setLoader(true));
    try {
      const response = await fetchSelfMatrimonialById(id);
      if (response && response.status === 200) {
        setMatrimonial(response.data.data);
        setServerError('');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin");
      } else if (error.response && error.response.status === 500) {
        let errorMessage = error.response.data.message;
        navigate("/server/error", { state: { errorMessage } });
      }
    } finally {
      dispatch(setLoader(false));
    }
  }
  const getArray = (value) => {
    if (Array.isArray(value)) {
      return value;
    }
    return [value];
  }
  useEffect(() => {
    if (matrimonial) {
      setBrotherDetails(matrimonial.brothers_details);
      setSisterDetails(matrimonial.sisters_details);
      setProposalPhotos(getArray(matrimonial.proposal_photos));
    }
  }, [matrimonial]);

  useEffect(() => {
    if (id) {
      getSelfMatrimonial(id)
    }
  }, [id]);

  return (
    <div>
      <div id="" className="pb-4 pt-2">
        <div id="matrimonial-info" className="container">
          <div className="card shadow" id='font-Resize'>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 ">
                  <div className="card-title">
                    <h5 className="mb-3 text-primary">Matrimonial Info</h5>
                  </div>
                  {matrimonial ? (
                    <form className="p-3 mb-3 ">
                      <div className="row">
                        <div className="mb-3 col-md-6  col-sm-12 col-xs-12">
                          <div className="row">
                            <div className="col-md-4">
                              <label className="fw-bold">Father Name :</label>
                            </div>
                            <div className="col-md-8">
                              <label className="">{matrimonial.father_name || "N/A"}</label>
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
                                {matrimonial.mother_name || "N/A"}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="mb-3 col-md-6 col-sm-12 col-xs-12">
                          <div className="row">
                            <div className="col-md-4">
                              <label className="fw-bold">Matrimonial Created For :</label>
                            </div>
                            <div className="col-md-8">
                              <label className="">
                                {matrimonial.profile_created_for || "N/A"}
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
                                {matrimonial.height_in_feet || "N/A"}
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
                                {matrimonial.brother_count || "N/A"}
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
                                {matrimonial.sister_count || "N/A"}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="row">
                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <div className="row">
                            <div className="col-4">
                              <label htmlFor="status" className="fw-bold">
                                Brother Details :
                              </label>
                            </div>
                            <div className="col-8">
                              <label className="w-75" >
                                {brotherDetails || "N/A"}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                          <div className="row">
                            <div className="col-md-4">
                              <label htmlFor="status" className="fw-bold ">
                                Sister Details :
                              </label>
                            </div>
                            <div className="col-md-8">
                              <label className="w-75">
                                {sisterDetails || "N/A"}
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
                                {matrimonial.is_manglik}
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
                                {matrimonial.salary_package || "N/A"}
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
                                {matrimonial.paternal_gotra || "N/A"}                          </label>
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
                                {matrimonial.maternal_gotra || "N/A"}
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
                                {matrimonial.biodata && (
                                  <span>
                                    <a href={matrimonial.biodata} download="biodata.pdf" target="_blank">
                                      <i className="fa-regular fa-file-lines"></i> Download Biodata
                                    </a>
                                    &nbsp;({getFileType(matrimonial.biodata)})
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
                                    proposalPhotos ? proposalPhotos.map((item, idx) => (
                                      <a href={item} target='_blank'>
                                        <img className='m-1' src={item} /> </a>
                                    )) : ''
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
