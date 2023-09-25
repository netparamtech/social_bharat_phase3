import React, { useEffect, useState } from 'react';
import { Dropdown, Menu, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const UserSearchDropdown = () => {
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);

  const navigate = useNavigate();

  const handleSearchPeopleClick = (e) => {
    e.preventDefault();
    navigate('/user/search');
  }

  const handleSearchBusinessClick = (e) => {
    e.preventDefault();
    navigate('/user/search/business');
  }

  const handleSearchPartnerClick = (e) => {
    e.preventDefault();
    navigate('/user/search/partner');
  }

  const generateMenuItems = () => {
    const items = [
      {
        key: '1',
        label: (
          <span onClick={handleSearchPeopleClick} className='menu-font'>
            <i class="fa-solid fa-users m-2"></i> Search People
          </span>
        ),
      },
      {
        key: '2',
        label: (
          <span onClick={handleSearchBusinessClick} className='menu-font'>
            <i class="fa-solid fa-briefcase m-2"></i> Search Business
          </span>
        ),
      },
      {
        key: '3',
        label: (
          <span onClick={handleSearchPartnerClick} className='menu-font'>
            <i class="fa-solid fa-ring m-2"></i> Search Partner
          </span>
        ),
      },
    ];
    return items;
  };

  const items = generateMenuItems();

  const menu = (
    <Menu>
      {items.map(item => (
        <Menu.Item key={item.key}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

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

  return (
    <Dropdown overlay={menu} trigger={['hover']} placement="bottomRight">
      {
        isAndroidUsed?(<span className='customDrawerBody customUl'>
        Search
        </span>):(<span className='btn btn-icon btn-transparent-dark text-capitalize text-primary custom-font'>Search</span>)
      }
      
    </Dropdown>
  );
};

export default UserSearchDropdown;
