import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AllCms from './AllCms';

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};
const Cms = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Master CMS</h1>
      </div>

      <Card title="Content Management System (CMS)">
        <Card.Grid style={gridStyle}><a className="text-success" onClick={() => navigate('/home/cms')}>
          <h4>  HOME</h4>
        </a></Card.Grid>
        <Card.Grid style={gridStyle}><a className="text-success" onClick={()=>navigate('/admin/create/cms')}>
          <h4>Add More</h4>
        </a></Card.Grid>
      </Card>
      <AllCms />
    </div>
  );
};

export default Cms;
