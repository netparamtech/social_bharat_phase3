import React, { useEffect, useState } from 'react';

const ContactInfo = (props) => {
  const {user} = props;
  const [contacts,setContacts] = useState([]);
  useEffect(() => {
    if (user && user.data.contacts) {
      setContacts(user.data.education);
    }
  }, [user]);
  return (
    <div className="card mt-4 mb-5">
      <div className="card-body tab-content border-0 bg-white-smoke">
        <div className="tab-pane active" id="jobInfo">
          <h1 className="d-inline-flex">Contact Info</h1>
          <a href="update-job-profile" className="float-end" title="Edit Job">
            <i className="ms-5 fa-solid fa-user-pen mt-3 fs-5"></i>
          </a>
          <div className="table-responsive-sm" style={{ overflowX: 'auto' }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Address Type</th>
                  <th scope="col">Address Line</th>
                  <th scope="col">City</th>
                  <th scope="col">State</th>
                  <th scope="col">Country</th>
                </tr>
              </thead>
              <tbody>
                {contacts && contacts.map((item, idx) => (
                  <tr data-repeater-item scope="row">
                    <td>
                     {item.address_type}
                    </td>
                    <td>
                      {item.address_line}
                    </td>
                    <td>
                      {item.city}
                    </td>
                    <td>
                     {item.state}
                    </td>
                    <td>
                     {item.country}
                    </td>
                  </tr>
                ))}
                {/* Add more job rows here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
