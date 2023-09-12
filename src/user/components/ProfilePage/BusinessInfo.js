import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

const BusinessInfo = (props) => {
    const { user } = props;
    const [businessDetails, setBusinessDetails] = useState([]);
    const [collapsedItems, setCollapsedItems] = useState([]);// State to control collapse/expand

    const dispatch = useDispatch();
    const businessPhotos =
        user &&
        user.data &&
        user.data.businesses &&
        user.data.businesses.business_photos;

    const deleteBusinessDetails = async () => {
        // try {
        //   const response = await deletebusinesses();
        //   if (response && response.status === 200) {
        //     setbusinessesDetails((prevDetails) =>
        //       prevDetails.filter((detail) => detail.id !== user?.data?.businesses.id)
        //     );
        //   }
        // } catch (error) {
        //   //Unauthorized
        //   if (error.response && error.response.status === 401) {
        //     dispatch(logout());
        //     window.location.href = '/login';
        //   } else if (error.response && error.response.status === 500) {
        //     dispatch(logout());
        //     window.location.href = '/login';
        //   }
        // }
    };

    useEffect(() => {
        setBusinessDetails(user?.data?.businesses || []);
        // Initialize the collapsedItems state with false for each item
        setCollapsedItems(Array(user?.data?.businesses?.length).fill(true));
    }, [user]);

    const toggleCollapse = (value) => {
        const newCollapsedItems = [...collapsedItems];
        newCollapsedItems[value] = !newCollapsedItems[value];
        setCollapsedItems(newCollapsedItems);
    };

    return (
        <div id="businesses-section" className="content-wrapper pt-4">
            <div className="container">
                <div className="card shadow">
                    <div className="edit-icon add-more-detail">
                        <a
                            href="/user/update-business-profile"
                            title="Add More Detail"
                        >
                            <i className="btn btn-outline-info fas fa-plus"></i>
                        </a>
                    </div>

                    <div className="card-body">
                        <h5 className="fw-3 mb-3">Business Info</h5>
                        <div className="row">
                            {businessDetails && businessDetails.length > 0 ? (
                                <div>
                                    {/* Render all fields inside a collapse div */}
                                    {businessDetails.map((item, value) => (
                                        <div className="col-md-6" key={value}>

                                            <div className="card shadow">

                                                <div className="edit-icon">
                                                    <a href="/user/update-business-profile" title="Edit">
                                                        <i className="fas fa-pencil-alt"></i>
                                                    </a>
                                                </div>
                                                <div className="delete-icon">
                                                    <a href="#" title="Delete">
                                                        <i
                                                            className="fa-solid fa-trash"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                deleteBusinessDetails();
                                                            }}
                                                        ></i>
                                                    </a>
                                                </div>

                                                <div className="card-body">
                                                    <table className="table table-striped">
                                                        <tbody>
                                                            <tr>
                                                                <td>Business Name</td>
                                                                <td className="text-muted">
                                                                    {item.business_name}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Business Category</td>
                                                                <td className="text-muted">
                                                                    {item.business_category}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Street Address</td>
                                                                <td className="text-muted">
                                                                    {item.street_address}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    <button
                                                                        onClick={() => toggleCollapse(value)}
                                                                        className="btn-primary"
                                                                        type="button"
                                                                        data-toggle="collapse"
                                                                        data-target={`#collapse-${value}`} // Add a unique ID for each collapse element
                                                                        aria-expanded={!collapsedItems[value]} // Use the negation of collapsed state
                                                                    >
                                                                        {collapsedItems[value] ? "Show More" : "Show Less"}
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                                <div className={`card-body collapse${collapsedItems[value] ? "" : " show"}`} id={`collapse-${value}`}>
                                                    <table className="table table-striped">
                                                        <tbody>
                                                            <tr>
                                                                <td>City</td>
                                                                <td className="text-muted" >
                                                                    {item.city}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>State</td>
                                                                <td className="text-muted">
                                                                    {item.state}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Country</td>
                                                                <td className="text-muted">
                                                                    {item.country}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Contact 1</td>
                                                                <td className="text-muted">
                                                                    {item.contact1}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Contact 2</td>
                                                                <td className="text-muted">
                                                                    {item.contact2}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Contact 3</td>
                                                                <td className="text-muted">
                                                                    {item.contact3}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Email</td>
                                                                <td className="text-muted">
                                                                    {item.business_email}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Website Link</td>
                                                                <td className="text-muted">
                                                                    {item.business_website}
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td>Business Photo</td>
                                                                <td className="proposal-Photo">
                                                                    {businessPhotos &&
                                                                        Array.isArray(businessPhotos) ? (
                                                                        businessPhotos.map((item, idx) => (
                                                                            <a href={item} target="_blank">
                                                                                <img className="m-1" src={item} />
                                                                            </a>
                                                                        ))
                                                                    ) : (
                                                                        <a href={businessPhotos} target="_blank">
                                                                            <img src={businessPhotos} />
                                                                        </a>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Status</td>
                                                                <td className="text-muted">
                                                                    {item.status}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            ) : (
                                <div className="add-more-info ">
                                    <a href="/user/update-business-profile" className="btn btn-secondary">
                                        Add Business Info
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Conditional rendering for "Show More" button */}

                    </div>
                </div>
            </div>
        </div >
    );
};

export default BusinessInfo;
