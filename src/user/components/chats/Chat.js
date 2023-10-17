import React from 'react';

const Chat = () => {
  return (
    <section style={{ backgroundColor: '#CDC4F9' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card" id="chat3" style={{ borderRadius: '15px' }}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                    <div className="p-3">
                      <div className="input-group rounded mb-3">
                        <input
                          type="search"
                          className="form-control rounded"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-addon"
                        />
                        <span
                          className="input-group-text border-0"
                          id="search-addon"
                        >
                          <i className="fas fa-search"></i>
                        </span>
                      </div>

                      <div
                        data-mdb-perfect-scrollbar="true"
                        style={{ position: 'relative', height: '400px' }}
                      >
                        <ul className="list-unstyled mb-0">
                          <li className="p-2 border-bottom">
                            {/* ... Chat list item content ... */}
                          </li>
                          {/* ... More list items ... */}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 col-lg-7 col-xl-8">
                    <div
                      className="pt-3 pe-3"
                      data-mdb-perfect-scrollbar="true"
                      style={{ position: 'relative', height: '400px' }}
                    >
                      <div className="d-flex flex-row justify-content-start">
                        {/* ... Chat content ... */}
                      </div>
                    </div>

                    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                      {/* ... Input area with icons ... */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
