import { useEffect, useState } from 'react';
import { updateMatrimonialInfo, uploadImage, uploadMultipleImages, uploadMultiplePDFs, uploadPdf } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const UpdateMatrimonial = (props) => {
  const { userMatrimonial } = props;

  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [skinTone, setSkinTone] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInch, setHeightInch] = useState('');
  const [weight, setWeight] = useState('');
  const [cast, setCast] = useState('');
  const [gotraSelf, setGotraSelf] = useState('');
  const [paternalGotra, setPaternalGotra] = useState('');
  const [maternalGotra, setMaternalGotra] = useState('');

  const [proposalPhoto, setProposalPhoto] = useState([]);
  const [tempProposalPhotoUrl, setTempProposalPhotoUrl] = useState([]);

  const [biodataFile, setBiodataFile] = useState([]);
  const [tempBiodataFileUrl, setTempBiodataFileUrl] = useState([]);

  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleProposalPhotoChange = async (e) => {
    const selectedFiles = e.target.files;
    setProposalPhoto(selectedFiles); // Set the selected files

    const formData = new FormData();

    // Append each file to the FormData
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]);
    }

    try {
      const response = await uploadMultipleImages(formData); // Make an API call to get temporary URL
      if (response.status === 200) {
        setTempProposalPhotoUrl(response.data.data.files);
      }
    } catch (error) {
      // Handle error or show an error message
    }
  };

  const handleBiodataFileChange = async (e) => {
    const selectedFiles = e.target.files;
    setBiodataFile(selectedFiles);

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('pdfs', selectedFiles[i]);
    }


    try {
      const response = await uploadMultiplePDFs(formData); // Make an API call to get temporary URL
      if (response && response.status === 200) {
        console.log("hello");
        console.log(response.data.data.files)
        setTempBiodataFileUrl(response.data.data.files);
      }
    } catch (error) {
      // Handle error or show an error message
    }
  };


  const handleSubmit = async (event) => {

    event.preventDefault();
    console.log(tempProposalPhotoUrl)
    const matrimonialData = {
      father_name: fatherName,
      mother_name: motherName,
      height_in_feet: `${heightFeet}.${heightInch}`,
      weight_in_kg: weight,
      skin_tone: skinTone,
      gotra: gotraSelf,
      maternal_gotra: maternalGotra,
      paternal_gotra: paternalGotra,
      cast: cast,
      proposal_photos: tempProposalPhotoUrl, // Use the temporary URL
      biodata: tempBiodataFileUrl, // Use the temporary URL
    };

    console.log(tempBiodataFileUrl)

    try {
      const response = await updateMatrimonialInfo(matrimonialData);
      if (response && response.status === 200) {
        setErrors('');
        navigate('/profile')
      }
    } catch (error) {
      // Handle error
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);

      }

      //Unauthorized
      else if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }

  }

  useEffect(() => {
    console.log(userMatrimonial, "checking")
    // Set default values from userMatrimonial prop when it changes
    if (userMatrimonial) {
      setFatherName(userMatrimonial.father_name || '');
      setMotherName(userMatrimonial.mother_name || '');
      setSkinTone(userMatrimonial.skin_tone || '');
      setHeightFeet(userMatrimonial.height_feet || '');
      setHeightInch(userMatrimonial.height_inch || '');
      setWeight(userMatrimonial.weight_in_kg || '');
      setCast(userMatrimonial.cast || '');
      setGotraSelf(userMatrimonial.gotra || '');
      setMaternalGotra(userMatrimonial.maternal_gotra || '');
      setPaternalGotra(userMatrimonial.paternal_gotra || '');
      setProposalPhoto(userMatrimonial.proposal_photos || '');
      setBiodataFile(userMatrimonial.biodata || '');

      // You can similarly handle the proposalPhoto and biodataFile values here if needed
    }
  }, [userMatrimonial]);


  return (
    <div id="auth-wrapper" className="pt-5 pb-5">
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 p-5">
                <div className="card-title">
                  <h3 className="mb-3">Matrimonial Info</h3>
                </div>
                <form onSubmit={handleSubmit} className="w-100 w-lg-75">
                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Father Name</label>
                      <input type="text"
                        name="fatherName"
                        id="fatherName"
                        placeholder="Enter Father Name"
                        className="form-control"
                        autoFocus
                        defaultValue={fatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                      />
                      {errors.father_name && <span className='error'>{errors.father_name}</span>}
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Mother Name</label>
                      <input type="text"
                        name="motherName"
                        id="motherName"
                        placeholder="Enter Mother Name"
                        className="form-control"
                        defaultValue={motherName}
                        onChange={(e) => setMotherName(e.target.value)}
                      />
                      {errors.mother_name && <span className='error'>{errors.mother_name}</span>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Skin Tone</label>
                      <select className="form-select form-control" aria-label="Default select example" value={skinTone} onChange={(e) => setSkinTone(e.target.value)}>
                        <option value="">---Select Skin---</option>
                        <option value="FAIR">FAIR</option>
                        <option value="DARK">DARK</option>
                        <option value="WHEATISH">WHEATISH</option>
                      </select>
                      {errors.skin_tone && <span className='error'>{errors.skin_tone}</span>}
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Height</label>
                      <div className="d-flex">
                        <div>
                          <label htmlFor="feet" className="col-lg-6 col-sm-12 col-xs-12 text-secondary">Feet:</label>
                          <input type="range" name="" id="" min="1" max="15" defaultValue={heightFeet} onChange={(e) => setHeightFeet(e.target.value)} />

                        </div>
                        <div>
                          <label htmlFor="inch" className="col-lg-6 col-sm-12 col-xs-12 text-secondary">Inch:</label>
                          <input type="range" name="" id="" min="1" max="12" defaultValue={heightInch} onChange={(e) => setHeightInch(e.target.value)} />

                        </div>
                        {errors.height_in_feet && <span className='error'>{errors.height_in_feet}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Weight</label>
                      <input type="number" name="weight" id="weight" placeholder="Enter Weight" className="form-control" defaultValue={weight} onChange={(e) => setWeight(e.target.value)} />
                      {errors.weight_in_kg && <span className='error'>{errors.weight_in_kg}</span>}
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Cast</label>
                      <input type="text" name="cast" id="cast" placeholder="Enter Cast" className="form-control" defaultValue={cast} onChange={(e) => setCast(e.target.value)} />
                      {errors.cast && <span className='error'>{errors.cast}</span>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Gotra </label>
                      <input type="text" name="gotra" id="gotra" placeholder="Enter Gotra" className="form-control" defaultValue={gotraSelf} onChange={(e) => setGotraSelf(e.target.value)} />
                      {errors.gotra && <span className='error'>{errors.gotra}</span>}
                    </div>
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Paternal Self</label>
                      <input type="text" name="paternal" id="paternal" placeholder="Enter Paternal Gotra" className="form-control" defaultValue={paternalGotra} onChange={(e) => setPaternalGotra(e.target.value)} />
                      {errors.paternal_gotra && <span className='error'>{errors.paternal_gotra}</span>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Maternal Gotra</label>
                      <input type="text" name="maternal" id="maternal" placeholder="Enter Maternal Gotra" className="form-control" defaultValue={maternalGotra} onChange={(e) => setMaternalGotra(e.target.value)} />
                      {errors.maternal_gotra && <span className='error'>{errors.maternal_gotra}</span>}
                    </div>
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Proposal Photo </label>
                      <input
                        type="file"
                        className="form-control"
                        accept=".png, .jpg, .jpeg"
                        id="proposalPhoto"
                        defaultValue={proposalPhoto}
                        onChange={handleProposalPhotoChange}
                        multiple
                      />
                      {errors.proposal_photo && <span className='error'>{errors.proposal_photo}</span>}

                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-lg-6 col-sm-12 col-xs-12">
                      <label className="form-label">Biodata </label>
                      <input type="file" className="form-control"
                        accept=".pdf ,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        id="biodata"
                        onChange={handleBiodataFileChange}
                        multiple
                      />
                      {errors.biodata && <span className='error'>{errors.biodata}</span>}
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-lg-6 col-sm-12 col-xs-12">
                      <button type="submit" className="btn btn-primary">Update</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMatrimonial;
