import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
const ChatDrawer = ({ open, showDrawer, onClose }) => {
  
  return (
    <>
      <div className="text-start ms-3 mt-2 hover-pointer">
        <i className="fa-regular fa-comments text-primary" onClick={showDrawer}></i>
      </div>

      <Drawer title="Chat" width={520} closable={open} onClose={onClose} open={open}  style={{
              zIndex: 99999,
              // width: "70%",
              background: "rgba(255, 255, 255, 0.8)",
              borderBottomLeftRadius: "3%",
              borderBottomRightRadius: "3%",
              // height:"70%"
            }}>
      <Drawer
          title="Basic Drawer"
          placement="right"
          footer="Footer"
          onClose={onClose}
          open={open}
        >
          <div class="card-body overflow-y-scroll">
              {/* {serverError && <span className='error'>{serverError}</span>} */}
              <ul class="list-group ">
                <li
                  class="list-group-item text-start align-items-start"
                >
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Jack Sparrow</div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur bibendum ornare dolor, quis ullamcorper ligula
                    sodales.
                  </div>
                  <span class="badge bg-primary rounded-pill text-muted"
                  ><i class="bi bi-clock"></i> 12 mins ago</span
                  >
                </li>
                <li
                  class="list-group-item  text-end  align-items-start"
                >
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Bhaumik Patel</div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur bibendum ornare dolor, quis ullamcorper ligula
                    sodales.
                  </div>
                  <span class="text-muted"
                  ><i class="bi bi-clock "></i> 13 mins ago</span
                  >
                </li>

                <li
                  class="list-group-item text-start align-items-start"
                >
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Jack Sparrow</div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur bibendum ornare dolor, quis ullamcorper ligula
                    sodales.
                  </div>
                  <span class="badge bg-primary rounded-pill text-muted"
                  ><i class="bi bi-clock"></i> 12 mins ago</span
                  >
                </li>
                <li
                  class="list-group-item  text-end  align-items-start"
                >
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Bhaumik Patel</div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur bibendum ornare dolor, quis ullamcorper ligula
                    sodales.
                  </div>
                  <span class="text-muted"
                  ><i class="bi bi-clock "></i> 13 mins ago</span
                  >
                </li>

                <li
                  class="list-group-item text-start align-items-start"
                >
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Jack Sparrow</div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur bibendum ornare dolor, quis ullamcorper ligula
                    sodales.
                  </div>
                  <span class="badge bg-primary rounded-pill text-muted"
                  ><i class="bi bi-clock"></i> 12 mins ago</span
                  >
                </li>
                <li
                  class="list-group-item  text-end  align-items-start"
                >
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Bhaumik Patel</div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur bibendum ornare dolor, quis ullamcorper ligula
                    sodales.
                  </div>
                  <span class="text-muted"
                  ><i class="bi bi-clock "></i> 13 mins ago</span
                  >
                </li>

              </ul>
            </div>
        </Drawer>
      </Drawer>
    </>
  );
};
export default ChatDrawer;