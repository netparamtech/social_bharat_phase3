import React from 'react';
import { useSelector } from 'react-redux';

const BasicProfile = () => {

    const user = useSelector((state) => state.userAuth.user)

    const name = user && user.name && user.name;
    const email = user && user.user && user.user.email;
    const mobile = user && user.mobile && user.mobile;
    const community = user && user.community_id && user.community_id;
    const gender = user && user.gender && user.gender;
    
    return (
        <div className="card">
            <div className="card-body tab-content border-0 bg-white-smoke">
                {/* Basic Profile */}
                <div className="tab-pane active" id="basicProfile">
                    <form action="#">
                        <h1 className="d-inline-flex">Basic Profile</h1>
                        <a href="/update-basic-profile" className="float-end" title="Edit Profile">
                            <i className="fa-solid fa-user-pen mt-3 fs-5"></i>
                        </a>
                        <div className="row">
                            <label htmlFor="name" className="col-sm-3 col-form-label">
                                Name
                            </label>
                            <div className="col-sm-7">
                                <input type="text" readOnly className="form-control-plaintext" id="name" defaultValue={name} />
                            </div>
                        </div>

                        <div className="row">
                            <label htmlFor="email" className="col-sm-3 col-form-label">
                                Email
                            </label>
                            <div className="col-sm-7">
                                <input
                                    type="email"
                                    readOnly
                                    className="form-control-plaintext"
                                    id="email"
                                    defaultValue={email}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <label htmlFor="gender" className="col-sm-3 col-form-label">
                                Gender
                            </label>
                            <div className="col-sm-7">
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control-plaintext"
                                    id="gender"
                                    defaultValue={gender}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <label htmlFor="community" className="col-sm-3 col-form-label">
                            Community
                            </label>
                            <div className="col-sm-7">
                                <input
                                    type="text"
                                    readOnly
                                    className="form-control-plaintext"
                                    id="community"
                                    defaultValue={community}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <label htmlFor="mobile" className="col-sm-3 col-form-label">
                                Mobile
                            </label>
                            <div className="col-sm-7 d-inline-flex">
                                <input
                                    type="number"
                                    readOnly
                                    className="form-control-plaintext"
                                    id="mobile"
                                    defaultValue={mobile}
                                />
                                <a
                                    href="update-mobile"
                                    className="btn btn-sm btn-outline-success btn-mobile-change"
                                >
                                    Update
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BasicProfile;
