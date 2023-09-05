import { useEffect, useState } from 'react';
import { updateMatrimonialInfo, uploadMultipleImages, uploadPdf } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import { getFeet, getInches } from '../../util/Conversion';

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
  const [proposalPreview, setProposalPreview] = useState([]);

  const [biodataFile, setBiodataFile] = useState('');
  const [tempBiodataFileUrl, setTempBiodataFileUrl] = useState('');
  const [biodataPreview, setBiodataPreview] = useState('');

  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleProposalPhotoChange = async (e) => {
    const selectedFiles = e.target.files;
    setProposalPhoto(selectedFiles); // Set the selected files

    const totalFiles = tempProposalPhotoUrl.length + selectedFiles.length;
    if (totalFiles > 5) {
      alert("Total files (including existing ones) cannot exceed 5.");
      e.target.value = null; // Clear the input field
      return;
    }

    const previewUrls = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const previewUrl = URL.createObjectURL(file);
      previewUrls.push(previewUrl);
    }

    const combinedUrls = [...previewUrls, ...tempProposalPhotoUrl];
    setProposalPreview(combinedUrls);

    const formData = new FormData();

    // Append each file to the FormData
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]);
    }

    try {
      const response = await uploadMultipleImages(formData); // Make an API call to get temporary URL
      if (response.status === 200) {
        const combineTempUrls = [...tempProposalPhotoUrl, ...response.data.data.files];
        setTempProposalPhotoUrl(combineTempUrls);
      }
    } catch (error) {
      // Handle error or show an error message
    }
  };

  const handleBiodataFileChange = async (e) => {
    const selectedFiles = e.target.files[0];
    setBiodataFile(selectedFiles);
    setBiodataPreview(URL.createObjectURL(selectedFiles));

    const formData = new FormData();
    formData.append('pdf', selectedFiles);


    try {
      const response = await uploadPdf(formData); // Make an API call to get temporary URL
      if (response && response.status === 200) {
        console.log("hello");
        console.log(response.data.data.files)
        setTempBiodataFileUrl(response.data.data.file);
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
        window.location.href = '/profile';
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

  const handleDeleteImage = (indexToDelete) => {
    // Create copies of the current arrays
    const updatedProposalPreview = [...proposalPreview];
    const updatedProposalTempUrl = [...tempProposalPhotoUrl];

    // Remove the image at the specified index from both arrays
    updatedProposalPreview.splice(indexToDelete, 1);
    updatedProposalTempUrl.splice(indexToDelete, 1);

    // Update the state variables with the updated arrays
    setProposalPreview(updatedProposalPreview);
    setTempProposalPhotoUrl(updatedProposalTempUrl);
  };


  useEffect(() => {
    console.log(userMatrimonial, "checking")
    // Set default values from userMatrimonial prop when it changes
    if (userMatrimonial) {
      setFatherName(userMatrimonial.father_name || '');
      setMotherName(userMatrimonial.mother_name || '');
      setSkinTone(userMatrimonial.skin_tone || '');
      setHeightFeet(getFeet(userMatrimonial.height_in_feet) || '');
      setHeightInch(getInches(userMatrimonial.height_in_feet) || '');
      setWeight(userMatrimonial.weight_in_kg || '');
      setCast(userMatrimonial.cast || '');
      setGotraSelf(userMatrimonial.gotra || '');
      setMaternalGotra(userMatrimonial.maternal_gotra || '');
      setPaternalGotra(userMatrimonial.paternal_gotra || '');
      setProposalPhoto(userMatrimonial.proposal_photos || '');
      {
        userMatrimonial && userMatrimonial.proposal_photos && Array.isArray(userMatrimonial.proposal_photos) ?
          (setTempProposalPhotoUrl(userMatrimonial.proposal_photos || '')) : (setTempProposalPhotoUrl([userMatrimonial.proposal_photos] || ''))
      }

      {
        userMatrimonial && userMatrimonial.proposal_photos && Array.isArray(userMatrimonial.proposal_photos) ? (setProposalPreview(userMatrimonial.proposal_photos || ''))
          :
          (setProposalPreview([userMatrimonial.proposal_photos] || ''))
      }

      setBiodataFile(userMatrimonial.biodata || '');
      setBiodataPreview(userMatrimonial.biodata || '');
      setTempBiodataFileUrl(userMatrimonial.biodata || '');

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
                          <input
                            type="range"
                            name=""
                            id=""
                            min="1"
                            max="15"
                            defaultValue={heightFeet}
                            onChange={(e) => setHeightFeet(parseInt(e.target.value, 10))}
                          />
                          <span>{heightFeet}</span> {/* Display the current value */}
                        </div>
                        <div>
                          <label htmlFor="inch" className="col-lg-6 col-sm-12 col-xs-12 text-secondary">Inches:</label>
                          <input
                            type="range"
                            name=""
                            id=""
                            min="1"
                            max="12"
                            defaultValue={heightInch}
                            onChange={(e) => setHeightInch(parseInt(e.target.value, 10))}
                          />
                          <span>{heightInch}</span> {/* Display the current value */}
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
                      {errors.proposal_photos && <span className='error'>{errors.proposal_photos}</span>}
                      <div className='proposal-Photo d-flex'>
                        {proposalPreview &&
                          proposalPreview.map((item, idx) => (
                            <div className='m-2' key={idx}>
                              <img src={item} alt={`Photos ${idx + 1}`} />
                              <button type='button' className='btn' onClick={() => handleDeleteImage(idx)}>
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          ))}
                      </div>
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
                      <div className="proposal-Photo d-flex">
                        <span>{biodataPreview?"file selected":''}</span>
                      </div>
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
