import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const DropdownOnServices = ({path}) => {
    const [isAndroidUsed, setIsAndroidUsed] = useState(false);
    const navigate = useNavigate();
    const items = [
        {
          label: (
            <p
              className={`hover-pointer ${window.location.pathname === path ? "active" : "inactive"
                }`}
              style={{ display: 'flex', alignItems: 'center' }}  // Add this style
              onClick={(e) => {
                e.preventDefault();
                navigate('/user/search/service');
              }}
            >
              <img src="/user/images/service3.jpg" width="30px" className='me-1' alt="Service Image" />
              <span>VIEW /CREATE</span>
            </p>
          ),
          key: '0',
        },
        {
          label: (
            <p
              className={`hover-pointer ${window.location.pathname === path ? "active" : "inactive"
                }`}
              style={{ display: 'flex', alignItems: 'center' }}  // Add this style
              onClick={(e) => {
                e.preventDefault();
                navigate('/user/user-registered-services');
              }}
            >
              <img src="/user/images/service4.png" width="30px" className='me-1' alt="Service Image" />
              <span>MY SERVICES</span>
            </p>
          ),
          key: '1',
        },
      ];
      const dropdownStyle = {
        width: isAndroidUsed ? '60%' : '12%',
        height: '300px',
      };
      
      useEffect(() => {
        const handleResize = () => {
          setIsAndroidUsed(window.innerWidth < 1000); // Adjust the threshold based on your design considerations
        };
    
        // Listen for window resize events
        window.addEventListener("resize", handleResize);
        handleResize(); // Call initially to set the correct value
    
        // Cleanup the event listener when component is unmounted
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    useEffect(()=>{
        console.log(path);
    },[]);
    return (
        <Dropdown
            menu={{
                items,
            }}
            trigger={['hover']}
            overlayStyle={dropdownStyle}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <p className='text-black m-2'>SERVICES</p>
                    <DownOutlined className='text-black mt-0' />
                </Space>
            </a>
        </Dropdown>
    );
}
export default DropdownOnServices;