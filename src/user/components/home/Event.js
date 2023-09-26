import React from "react";

const EventForm =  () => {
  return (
    <>
    <div id="auth-wrapper" class="pt-5 pb-5">
    <div class="container">
      <div class="card shadow">
        <div class="card-body">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12 p-5">
              <div class="card-title">
                <h3 class="mb-3">Event</h3>
              </div>
              <form class="w-100 w-lg-75">
                <div class="row">
                  <div class="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label class="form-label">*Event Name</label>
                    <input type="text"
                      name="eventName"
                      id="businessName"
                      placeholder="Enter Event Name"
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label class="form-label">*Event Category</label>
                    <select id="event_category" class="form-control">
                      <option value="">---Select Business Category---</option>
                    </select>
                  </div>
                </div>
  
                <div class="row">
                  <div class="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label class="form-label">*Street Address</label>
                    <input type="text"
                      name="stressAddress"
                      id="stressAddress"
                      placeholder="Enter Street Address"
                      class="form-control"
                    />
                  </div>
  
                  <div class="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label class="form-label">Country</label>
                    <select id="country" class="form-control">
                      <option value="India">India</option>
                      
                    </select>
                  </div>
                </div>
  
                <div class="row">
                  <div class="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label class="form-label">State</label>
                    <select id="state" class="form-control"></select>
                  </div>
                  <div class="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label class="form-label">City</label>
                    <select id="city" class="form-control"></select>
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label class="form-label">*Contact 1</label>
                    <input type="text"
                      name="contact1"
                      id="contact1"
                      placeholder="Enter Contact 1"
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label class="form-label">Contact 2</label>
                    <input type="text"
                      name="contact2"
                      id="contact2"
                      placeholder="Enter Contact 2"
                      class="form-control"
                    />
                  </div>
                </div>
                
                <div class="row">
                  <div class="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label class="form-label">Venue Time </label>
                    <input type="time"
                      name="email"
                      id="email"
                      placeholder="Enter Contact 1"
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label class="form-label">Venue Date </label>
                    <input type="date"
                      name="businessWebsite"
                      id="businessWebsite"
                      placeholder="Enter Event Date"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class='row'>
                  <div class="mb-3 col-lg-6 col-sm-12 col-xs-12">
                    <label for="status">Status</label>
                    <select class="form-control" id="status" name="status">
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                </div>
                <div className="fw-light fs-6">
                  <input type="checkbox" /> Ticket charges if any    
                                
                </div>
  
                <div class="row mt-4">
                  <div class="col-lg-6 col-sm-12 col-xs-12">
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
    </>
  )
}

export default EventForm;