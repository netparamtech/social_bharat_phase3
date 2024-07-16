import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import notoSansDevanagariRegular from './NotoSansDevanagari-Regular'; // Import the base64 font string

const GenerateBiodata = (props) => {
    const { userData } = props;
    const [age, setAge] = useState('');

    const checkMobileVisibility = (mobileNumber) => {
        const isHidden = /\*/.test(mobileNumber);
        return !isHidden;
    };

    const generatePDF = async (userData) => {
        const pdf = new jsPDF();
        pdf.setFontSize(12); // Set smaller font size

        // Add the custom font to jsPDF
        pdf.addFileToVFS("NotoSansDevanagari-Regular.ttf", notoSansDevanagariRegular);
        pdf.addFont("NotoSansDevanagari-Regular.ttf", "NotoSansDevanagari", "normal");
        pdf.setFont("NotoSansDevanagari");

        // Create an HTML element containing the user data
        const htmlContent = `
            <div class="biodata-container">
                <div style="display:flex;justify-content:center;align-items:center;flex-direction:column;text-align:center;width:100%;height:80px;margin-bottom:10px;border-radius:20px">
                    <h5 style="font-weight:bold;font-size:16px;margin-top:10px;">www.socialbharat.org</h5>
                    <h5 style="font-weight:bold;font-size:16px;">Biodata</h5>
                </div>
               <style>
                    .biodata-container {
                        font-family: 'NotoSansDevanagari', sans-serif;
                        padding: 20px;
                        font-size:30px;
                        max-width: 100%;
                        height:100%;
                        margin: 0 auto;
                        background: rgba(0, 128, 0, 0.3);
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        position: relative;
                    }
                    .biodata-container h5 {
                        text-align: center;
                        color: #333;
                        word-wrap: break-word; /* Ensure long text wraps */
                        font-size: 20px; /* Reduced font size */
                    }
                    .biodata-container p {
                        color: #555;
                        line-height: 1.2; /* Reduced line height */
                        font-size: 20px; /* Reduced font size */
                        margin: 2px 0; /* Reduced margin between paragraphs */
                    }
                    .biodata-container .section-title {
                        font-weight: bold;
                        margin-top: 20px;
                        color:white;
                        background-color:green;
                        font-size: 20px; /* Slightly larger for section titles */
                        margin-bottom: 4px; /* Reduced margin below section titles */
                    }
                    .biodata-container .photo-container {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        width: 150px; /* Adjust the width as needed */
                        height: 150px; /* Adjust the height as needed */
                    }
                </style>
              
                <h5>Matrimonial Profile For: ${userData.matrimonial_profile_name}</h5>
                <p>Date of Birth: ${new Date(userData.matrimonial_profile_dob).toLocaleDateString()}</p>
                <p>Gender: ${userData.matrimonial_profile_gender}</p>
                <p>Father's Name: ${userData.father_name}</p>
                <p>Mother's Name: ${userData.mother_name}</p>
                <p>Height In Feet: ${userData.height_in_feet} feet</p>
                <p>Manglik: ${userData.is_manglik ? userData.is_manglik : 'N/A'}</p>
                <p>Mother Gotra: ${userData.maternal_gotra}</p>
                <p>Father Gotra: ${userData.paternal_gotra}</p>
                 <p>Number Of Brothers: ${userData.brother_count}</p>
                <p>Brother details: ${userData.brothers_details}</p>
                <p>Number Of Sisters: ${userData.sister_count}</p>
                <p>Sister Details: ${userData.sisters_details}</p>
                <p>Subcast: ${userData.subcast}</p>
                <p class="section-title">Job Profile</p>
                <p>${userData.matrimonial_profile_occupation}</p>
                <p>Package Details: ${userData.salary_package ? userData.salary_package : "Not Display"}</p>
                <p class="section-title">Education Details</p>
                <p>${userData.educational_details ? userData.educational_details : ''}</p>
                <p class="section-title">Job Details</p>
                <p>${userData.job_profile_description ? userData.job_profile_description : ''}</p>
                <p class="section-title">Other Details</p>
                <p>${userData.DESCRIPTION ? userData.DESCRIPTION : ''}</p>
                <p class="section-title">Contact Details</p>
                <p>Contact Number: ${userData.contact_number || (checkMobileVisibility(userData.mobile) ? userData.mobile : 'Not Available')}</p>
                 <p>State: ${userData.state}</p>
                  <p>City: ${userData.city}</p>
        `;

        // Convert HTML to canvas
        const htmlElement = document.createElement('div');
        htmlElement.innerHTML = htmlContent;
        document.body.appendChild(htmlElement);

        const canvas = await html2canvas(htmlElement);
        document.body.removeChild(htmlElement);

        // Add the canvas to the PDF
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);

        // Save the PDF with a specific name
        pdf.save(`${userData.matrimonial_profile_name}_biodata.pdf`);
    };

    useEffect(() => {
        if (userData && userData.data && userData.data.matrimonial[0] && userData.data.matrimonial[0].matrimonial_profile_dob) {
            const dob = userData.data.matrimonial[0].matrimonial_profile_dob;
            const dobDate = new Date(dob);
            const currentDate = new Date();

            // Calculate the age in years
            const ageInMilliseconds = currentDate - dobDate;
            const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

            setAge(ageInYears);
        }
    }, [userData]);

    return (
        <div>
            <a className="text-dark mt-3 hover-pointer-admin matrimonial-generate-biodata" onClick={() => generatePDF(userData)} title='View'
                style={{ border: '1px solid', borderRadius: '20px', padding: '4px', alignContent: 'center', textDecoration: 'none' }} >
                Download
                <img
                    src="/user/images/downloads.png"
                    width="20px" height={20}
                />
            </a>
        </div>
    );
};

export default GenerateBiodata;
