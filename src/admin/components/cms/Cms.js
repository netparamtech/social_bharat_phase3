import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <a href="" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          onClick={(e) => {
            e.preventDefault();
            navigate('/admin/cms/update');
          }}
        >
          Update CMS
        </a>
      </div>
     
      <Card title="Content Management System (CMS)">

      <Card.Grid style={gridStyle}><a className="text-success stretched-link hover-pointer-admin" onClick={() => navigate('/home/cms')}>
                      <h3>  HOME</h3>
                    </a></Card.Grid>
      </Card>
    </div>
  );
};

export default Cms;
