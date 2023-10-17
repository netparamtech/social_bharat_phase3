import React, { useState } from "react";
import { Button, Col, Divider, Drawer, Row, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const Setting = ({ visible }) => {
  const [open, setOpen] = useState(false);
  const showDrawer = (visible) => {
    setOpen(visible);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div id="setting-page">
        <div className="container mb-5">
          <div className="card shadow p-4">
            <div className="">
              <h5 class="">Settings</h5>
              <ol class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class=" text-setting-page">Mobile</div>
                    <label className="text-muted">
                      Allow to show your contact number visible to others
                    </label>
                  </div>
                  <span class="badge bg-primary rounded-pill">
                    {" "}
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-toggle="button"
                      aria-pressed="false"
                      autocomplete="off"
                    >
                      {" "}
                    </button>
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="text-setting-page">Subheading</div>
                    <label className="text-muted">
                      Allow to show your contact number visible to others
                    </label>
                  </div>
                  <span class="badge bg-primary rounded-pill">14</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start">
                  <div class="ms-2 me-auto">
                    <div class="text-setting-page">Subheading</div>
                    <label className="text-muted">
                      Allow to show your contact number visible to others
                    </label>
                  </div>
                  <span class="badge bg-primary rounded-pill">14</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Setting;
