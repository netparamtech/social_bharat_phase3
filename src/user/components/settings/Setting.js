import React, { useState } from 'react';
import { Button, Col, Divider, Drawer, Row, Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
const Setting = ({ visible }) => {
    const [open, setOpen] = useState(false);
    const showDrawer = (visible) => {
        setOpen(visible);
    };
    const onClose = () => {
        setOpen(false);
    };
    
    return (
        <>
            <span onClick={showDrawer} className='menu-font'>
                <i className="fas fa-cog m-2"></i> Settings
            </span>
            <Drawer title="Settings" width={520} closable={true} onClose={onClose} open={open}>   
                <Row>
                        <Col>
                            <Row>
                            <i className="fa fa-mobile m-2" aria-hidden="true"></i>
                                Mobile
                            </Row>
                            <Row>
                                <span className="text-muted">Allow to show your contact number visible to others</span>
                            </Row>
                        </Col>
                        <Col>
                            <Switch className="m-3" />
                        </Col>
                    </Row>
                    <Divider />
              
            </Drawer>
        </>
    );
};
export default Setting;
