import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

const GenerateBiodata = (props) => {
    const { userData } = props;
    const [age, setAge] = useState('');

    const generatePDF = (userData) => {
        const pdf = new jsPDF();
        pdf.setFontSize(12);
        // Draw a border around the entire matrimonial details section
        pdf.setDrawColor(0); // Set the border color to black
        pdf.setLineWidth(0.1); // Set the border width
        pdf.rect(10, 10, 190, 160); // Draw a rectangle as a border
        pdf.setFont('NotoSansDevanagari-Regular', 'normal');
        // Add content to the PDF
        const addPageIfNeeded = () => {
            const totalPages = pdf.internal.getNumberOfPages();
            if (totalPages > 0) {
                pdf.addPage();
            }
        };
        // Add matrimonial details
        pdf.text(150, 6, 'www.socialbharat.org');
        if (userData) {
            const matrimonialDetails = userData;

            let verticalPosition = 18;
            pdf.text(20, verticalPosition, `Matrimonial Profile for ${matrimonialDetails.matrimonial_profile_name.toUpperCase()}`);
            verticalPosition += 6;
            pdf.text(20, verticalPosition, `Date of Birth: ${new Date(matrimonialDetails.matrimonial_profile_dob).toLocaleDateString()}`);
            verticalPosition += 6;
            pdf.text(20, verticalPosition, `Gender: ${matrimonialDetails.matrimonial_profile_gender}`);
            verticalPosition += 6;
            pdf.text(20, verticalPosition, `Father's Name: ${matrimonialDetails.father_name}`);
            verticalPosition += 6;
            pdf.text(20, verticalPosition, `Mother's Name: ${matrimonialDetails.mother_name}`);
            verticalPosition += 6;
            pdf.text(20, verticalPosition, `Height In Feet: ${matrimonialDetails.height_in_feet} feet`);
            verticalPosition += 6;
            pdf.text(20, verticalPosition, `Manglik: ${matrimonialDetails.is_manglik ? matrimonialDetails.is_manglik : 'N/A'}`);
            verticalPosition += 6;
            pdf.text(20, verticalPosition, `Mother Gotra: ${matrimonialDetails.maternal_gotra}`);
            verticalPosition += 6;
            pdf.text(20, verticalPosition, `Father Gotra: ${matrimonialDetails.paternal_gotra}`);
            verticalPosition += 6;
            // Job Details
            const job = matrimonialDetails.matrimonial_profile_occupation;
            const jobDetails = pdf.splitTextToSize(job, 170);
            pdf.text(20, verticalPosition, "Job Profile");
            verticalPosition += 6;
            jobDetails.forEach(line => {
                pdf.text(20, verticalPosition, line);
                verticalPosition += 6;
            });
            verticalPosition += 6;
            pdf.text(20, verticalPosition, `Number Of Brothers: ${matrimonialDetails.brother_count}`);
            verticalPosition += 6;
            pdf.text(20, verticalPosition, `Brother details: ${matrimonialDetails.brothers_details}`);
            verticalPosition += 6;
            pdf.text(20, verticalPosition, `Number Of Sisters: ${matrimonialDetails.sister_count}`);
            verticalPosition += 6;
            pdf.text(20, verticalPosition, `Sister Details: ${matrimonialDetails.sisters_details}`);
            verticalPosition += 6;
            // pdf.text(20, verticalPosition, `Subcast: ${matrimonialDetails.subcast}`);
            // verticalPosition += 6;
            pdf.text(20, verticalPosition, `Package Details: ${matrimonialDetails.salary_package?matrimonialDetails.salary_package:"Not Display"}`);
            verticalPosition += 6;
            // Other Details
            const otherDetails = matrimonialDetails.DESCRIPTION;
            const otherDetailsLines = pdf.splitTextToSize(otherDetails, 170);
            pdf.text(20, verticalPosition, "Other Details:");
            verticalPosition += 6;
            otherDetailsLines.forEach(line => {
                pdf.text(20, verticalPosition, line);
                verticalPosition += 6;
            });
        }
        // Save the PDF with a specific name
        pdf.save(`${userData.matrimonial_profile_name}_biodata.pdf`);
    };

    useEffect(() => {
        if (userData && userData.data && userData.data.matrimonial[0] && userData.data.matrimonial[0].matrimonial_profile_dob && userData.data.matrimonial[0].matrimonial_profile_dob) {
            const dob = userData.data.matrimonial[0].matrimonial_profile_dob;
            const dobDate = new Date(dob);
            const currentDate = new Date();

            // Calculate the age in years
            const ageInMilliseconds = currentDate - dobDate;
            const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 26 * 665));

            setAge(ageInYears);
        }
    }, [userData && userData.data && userData.data.matrimonial[0] && userData.data.matrimonial[0].matrimonial_profile_dob && userData.data.matrimonial[0].matrimonial_profile_dob]);

    return (
        <div>
            <a className="text-dark mt-3 hover-pointer-admin" onClick={() => generatePDF(userData)} title='View'
                style={{ border: '1px solid', backgroundColor: 'greenyellow', borderRadius: '20px', padding: '4px', alignContent: 'center', textDecoration: 'none' }} >
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
