import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

const GenerateBiodata = (props) => {
    const { userData } = props;
    const [age, setAge] = useState('');

    const generatePDF = (userData) => {
        const pdf = new jsPDF();
        pdf.setFontSize(8);
        // Draw a border around the entire matrimonial details section
        pdf.setDrawColor(0); // Set the border color to black
        pdf.setLineWidth(0.1); // Set the border width
        pdf.rect(10, 10, 190, 60); // Draw a rectangle as a border
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
        if (userData.data.matrimonial && userData.data.matrimonial.length > 0) {
            const matrimonialDetails = userData.data.matrimonial[0];
           
            pdf.text(20, 15, `Matrimonial Profile for ${matrimonialDetails.matrimonial_profile_name.toUpperCase()}`);
            pdf.text(20, 18, `Date of Birth: ${new Date(matrimonialDetails.matrimonial_profile_dob).toLocaleDateString()}`);
            pdf.text(70, 18, `Age: ${age} year(s)`);
            pdf.text(20, 21, `Gender: ${matrimonialDetails.matrimonial_profile_gender}`);
            pdf.text(20, 24, `Father's Name: ${matrimonialDetails.father_name}`);
            pdf.text(20, 27, `Mother's Name: ${matrimonialDetails.mother_name}`);
            pdf.text(20, 30, `Height In Feet: ${matrimonialDetails.height_in_feet} feet`);
            pdf.text(20, 33, `Skin Tone: ${matrimonialDetails.cast}`);
            pdf.text(20, 36, `Manglik: ${matrimonialDetails.is_manglik ? 'Yes' : 'No'}`);
            pdf.text(20, 39, `Mother Gotra: ${matrimonialDetails.maternal_gotra}`);
            pdf.text(20, 42, `Father Gotra: ${matrimonialDetails.paternal_gotra}`);
            pdf.text(20, 45, `Number Of Brothers: ${matrimonialDetails.brother_count}`);
            pdf.text(20, 48, `Brother details: ${matrimonialDetails.brothers_details}`);
            pdf.text(20, 51, `Number Of Sisters: ${matrimonialDetails.sister_count}`);
            pdf.text(20, 54, `Sister Details: ${matrimonialDetails.sisters_details}`);
            pdf.text(20, 57, `Subcast: ${matrimonialDetails.subcast}`);
            pdf.text(20, 60, `Package Details: ${matrimonialDetails.salary_package}`);
            pdf.text(20, 67, `Other Details: ${matrimonialDetails.description}`);
        }
        // Save the PDF with a specific name
        pdf.save('user_biodata.pdf');
    };

    useEffect(() => {
        if (userData && userData.data &&userData.data.matrimonial[0]&& userData.data.matrimonial[0].matrimonial_profile_dob && userData.data.matrimonial[0].matrimonial_profile_dob) {
            const dob = userData.data.matrimonial[0].matrimonial_profile_dob;
            const dobDate = new Date(dob);
            const currentDate = new Date();

            // Calculate the age in years
            const ageInMilliseconds = currentDate - dobDate;
            const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365));

            setAge(ageInYears);
        }
    }, [userData && userData.data&&userData.data.matrimonial[0] && userData.data.matrimonial[0].matrimonial_profile_dob&& userData.data.matrimonial[0].matrimonial_profile_dob]);

    return (
        <div>
            {/* Add a button to trigger PDF generation */}
            <button className='me-5 rounded bg-success text-light' onClick={() => generatePDF(userData)}>Download Biodata</button>
        </div>
    );
};

export default GenerateBiodata;
