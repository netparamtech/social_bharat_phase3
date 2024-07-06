import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  CalendarOutlined,
  CommentOutlined,
  HistoryOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Sidebar({ collapsed, onCollapse }) {
  return (
    <Layout style={{
      minHeight: '100vh',
       backgroundColor: '#4e73d',
    }}>
      <Sider style={{
            minHeight: '100vh',
            width: collapsed ? '80px' : '200px',
        }} collapsible collapsed={collapsed} onCollapse={onCollapse}>
        {/* <div className="logo">
          <img src="/user/images/sb-logo.png" className="img-fluid" alt="Logo" />
        </div> */}
        <Menu mode="vertical" theme="dark" defaultSelectedKeys={["dashboard"]} >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/admin/dashboard">DASHBOARD</Link>
          </Menu.Item>

          <SubMenu key="masterSettings" icon={<SettingOutlined />} title="MASTER SETTINGS">
            <Menu.Item key="communities">
              <Link to="/admin/communities">COMMUNITIES</Link>
            </Menu.Item>
            <Menu.Item key="business-categories">
              <Link to="/admin/business-categories">BUSINESS</Link>
            </Menu.Item>
            <Menu.Item key="qualifications">
              <Link to="/admin/qualifications">QUALIFICATIONS</Link>
            </Menu.Item>
            <Menu.Item key="degrees">
              <Link to="/admin/degrees">DEGREES</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="siteSettings" icon={<BarsOutlined />} title="SITE SETTINGS">
            <Menu.Item key="banners">
              <Link to="/admin/banners">BANNERS</Link>
            </Menu.Item>
            <Menu.Item key="setting">
              <Link to="/admin/setting">SETTING URLS</Link>
            </Menu.Item>
            <Menu.Item key="email">
              <Link to="/admin/email">EMAIL</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="users" icon={<UserOutlined />}>
            <Link to="/admin/users">USERS</Link>
          </Menu.Item>

          <Menu.Item key="enquiries" icon={<QuestionCircleOutlined />}>
            <Link to="/admin/enquiries">ENQUIRIES</Link>
          </Menu.Item>

          <Menu.Item key="events" icon={<CalendarOutlined />}>
            <Link to="/admin/event/index">EVENTS</Link>
          </Menu.Item>

          <Menu.Item key="testimonials" icon={<CommentOutlined />}>
            <Link to="/admin/testimonials/index">TESTIMONIALS</Link>
          </Menu.Item>

          <Menu.Item key="bharatMataMandir" icon={<HistoryOutlined />}>
            <Link to="/admin/bharat-mandir/index">BHARAT MATA MANDIR</Link>
          </Menu.Item>

          <Menu.Item key="services" icon={<AppstoreOutlined />}>
            <Link to="/admin/service/index">SERVICES</Link>
          </Menu.Item>

          <Menu.Item key="jobs" icon={<QuestionCircleOutlined />}>
            <Link to="/admin/job-board">JOBS</Link>
          </Menu.Item>

          <Menu.Item key="cms" icon={<AppstoreOutlined />}>
            <Link to="/admin/cms">CMS</Link>
          </Menu.Item>
          <Menu.Item key="activities" icon={<AppstoreOutlined />}>
            <Link to="/admin/activities">ACTIVITIES</Link>
          </Menu.Item>
          <Menu.Item key="businesses" icon={<img style={{backgroundColor:'white'}} src="/admin/img/briefcase.png" width={15} />}>
            <Link to="/admin/businesses">BUSINESS</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      </Layout>
  );
}

export default Sidebar;
