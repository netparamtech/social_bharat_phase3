import React from 'react';
import { Dropdown, Menu, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const UserSearchDropdown = () => {

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
          <span onClick={handleSearchPeopleClick} className='menu-font '>
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

  return (
    <Dropdown overlay={menu} trigger={['hover']} placement="bottomRight">
      <span className='d-inline nav-link'>Search</span>
    </Dropdown>
  );
};

export default UserSearchDropdown;
