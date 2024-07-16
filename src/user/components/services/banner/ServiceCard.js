import { Rate } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ServiceCard = (props) => {
    const { items } = props;
    const [defaultImage, setDefaultImage] = useState(
        "/admin/img/download.jpg"
    );
    const [isAndroidUsed, setIsAndroidUsed] = useState(false);
    const [isFeedbackClicked, setIsFeedbackClicked] = useState(false);
    const [index, setIndex] = useState(0);

    const checkMobileVisibility = (mobileNumber) => {
        const isHidden = /\*/.test(mobileNumber);
        return !isHidden;
    };

    useEffect(() => {
        if (index) {
            setIndex(index)
        }
    }, [index])


    useEffect(() => {
        const handleResize = () => {
            setIsAndroidUsed(window.innerWidth < 1000); // Adjust the threshold based on your design considerations
        };

        // Listen for window resize events
        window.addEventListener("resize", handleResize);
        handleResize(); // Call initially to set the correct value

        // Cleanup the event listener when component is unmounted
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const UserCard = ({ item, isAndroidUsed }) => {
        return (
            <div className={`text-light`}>


                <div className="row">

                    <div className="col-md-5 col-sm-12">
                        <img
                            src={item.photo ? item.photo : defaultImage}
                            alt={item.name}
                            className="img-fluid"
                            style={{ width: '100px', height: '100px', borderRadius: '10px' }}
                        />
                        <p className="fs-4 m-2 text-light">{item.name.toUpperCase()}</p>
                        
                        {/* ... other content ... */}
                       

                    </div>
                    <div className="col-md-6">
                        <p className="text-light"> Providing Services In - {item.category}</p>
                        <div className="row">
                            <div className="flex-grow-1">

                                <p className="mb-2 pb-1 justify-content-start text-light" style={{ color: '#2b2a2a' }}>
                                    Provider Occupation-{item.occupation ? item.occupation.length > 50 ? (
                                        item.occupation.slice(0, 50) + "...."
                                    ) : (item.occupation) : ''}
                                </p>
                               
                                <div className="d-flex justify-content-start rounded-3 mt-2"
                                    style={{ backgroundColor: '#efefef' }}
                                >
                                    {/* Age-{age(item.matrimonial_profile_dob)} Years */}
                                </div>
                               
                                {/* <div
                                    className=" contact-container"
                                >
                                    <p className="mb-0 contact-number">
                                        Contact Numbers:
                                        <a href={`tel:${item.mobile1}`}>{item.mobile1}</a>
                                        {item.mobile2 && (
                                            <>
                                                <a href={`tel:${item.mobile2}`}>{item.mobile2}</a>
                                            </>
                                        )}
                                        {checkMobileVisibility(item.masked_mobile) && (
                                            <>
                                                <a href={`tel:${item.masked_mobile}`}>{item.masked_mobile}</a>
                                            </>
                                        )}
                                    </p>
                                </div> */}

                            </div>


                            <div className="d-flex justify-content-start rounded-3 mt-2 text-light"
                            >
                                {
                                    checkMobileVisibility(item.mobile) ? (
                                        <p>
                                            <a href={`tel:${item.mobile}`}>
                                                {item.mobile}
                                            </a>
                                        </p>
                                    ) : ''
                                }
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        );
    };



    return (
        <div>
           {
            items && (
                <div className="col-md-12 mt-2 mx-auto">
                    <div className="" style={{ borderRadius: '15px' }}>
                        <div className="text-light">

                            <UserCard
                                item={items}
                                isAndroidUsed={isAndroidUsed}
                            />

                        </div>
                    </div>
                </div>
            )
           }
        </div>
    );
};

export default ServiceCard;
