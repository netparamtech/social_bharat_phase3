import { Switch } from "antd";
import { useEffect } from "react";

const Setting = ({ visible }) => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);

  return (
    <>
      <div id="setting-page">
        <div className="container mb-5">
          <div className="card shadow p-4">
            <div className="">
              <h5 className="">Settings</h5>
              <ol className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className=" text-setting-page">Mobile</div>
                    <label className="text-muted">
                      Allow to show your contact number visible to others
                    </label>
                  </div>
                    <Switch defaultChecked />
                  
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="text-setting-page">Subheading</div>
                    <label className="text-muted">
                      Allow to show your contact number visible to others
                    </label>
                  </div>
                  <Switch defaultChecked />
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                    <div className="text-setting-page">Subheading</div>
                    <label className="text-muted">
                      Allow to show your contact number visible to others
                    </label>
                  </div>
                  <Switch defaultChecked />
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
