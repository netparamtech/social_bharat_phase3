import React, { useEffect, useState } from "react";
import { Dropdown, Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const UserSearchDropdown = () => {
  const [isAndroidUsed, setIsAndroidUsed] = useState(false);

  const navigate = useNavigate();

  const handleSearchPeopleClick = (e) => {
    e.preventDefault();
    navigate("/user/search");
  };

  const handleSearchBusinessClick = (e) => {
    e.preventDefault();
    navigate("/user/search/business");
  };

  const handleSearchPartnerClick = (e) => {
    e.preventDefault();
    navigate("/user/search/partner");
  };

  const generateMenuItems = () => {
    const items = [
      {
        key: "1",
        label: (
          <span onClick={handleSearchPeopleClick}  className={`menu-font ${
            window.location.pathname === "/user/search" ? "active" : "inactive"
          }`}>
            <i className="fa-solid fa-users m-2"></i> SEARCH MEMBER
          </span>
        ),
      },
      {
        key: "2",
        label: (
          <span onClick={handleSearchBusinessClick} className={`menu-font ${
            window.location.pathname === "/user/search/business" ? "active" : "inactive"
          }`}>
            <i className="fa-solid fa-briefcase m-2"></i> SEARCH BUSINESS
          </span>
        ),
      },
      {
        key: "3",
        label: (
          <span onClick={handleSearchPartnerClick} className={`menu-font ${
            window.location.pathname === "/user/search/partner" ? "active" : "inactive"
          }`}>
            <i className="fa-solid fa-heart-pulse m-2"></i>SEARCH PARTNER
          </span>
        ),
      },
    ];
    return items;
  };

  const items = generateMenuItems();

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
    <Dropdown
      menu={{
        items,
      }}
      trigger={["hover"]}
      placement="bottomRight"
      className="d-inline nav-link nav-item"
    >
      {isAndroidUsed ? (
        <span className="nav-item m-2">SEARCH</span>
      ) : (
        <span
          className={`btn btn-icon btn-transparent-dark text-capitalize text-primary  custom-font nav-link nav-item ${
            window.location.pathname === "/user/search" ||
            window.location.pathname === "/user/search/business" ||
            window.location.pathname === "/user/search/partner"
              ? "active"
              : "inactive"
          }`}
        >
          SEARCH
        </span>
      )}
    </Dropdown>
  );
};

export default UserSearchDropdown;
