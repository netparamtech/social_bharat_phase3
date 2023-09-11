import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function Test() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="container mt-5">
      <h1>Toggle Collapse Example</h1>

      {/* Button to Toggle Collapse */}
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseExample"
        onClick={toggleCollapse}
      >
        Toggle Collapse
      </button>

      {/* Collapsible Content */}
      <div className={`collapse ${isCollapsed ? 'show' : ''}`} id="collapseExample">
        <div className="card card-body">
          This is a collapsible content. Click the "Toggle Collapse" button to show/hide it.
        </div>
      </div>
    </div>
  );
}

export default Test;
