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
                <Row className="align-items-center">
                    <Col md={12}>
                        <Row className="align-items-center">
                            <Col xs="auto">
                                <i className="fa fa-mobile me-2 text-primary fs-2" aria-hidden="true"></i>
                            </Col>
                            <Col xs="auto">
                                Mobile
                            </Col>
                            <Col md={12}>
                            <Switch className="m-3" />
                        </Col>
                        </Row>
                        <Row>
                            <Col xs={24} className="text-muted">
                                Allow to show your contact number visible to others
                            </Col>
                        </Row>
                    </Col>
                   
                </Row>
                <Divider />
                <Row className="align-items-center">
                    <Col md={12}>
                        <Row className="align-items-center">
                            <Col xs="auto">
                                <i class="fa-solid fa-heart text-primary me-2 fs-2" aria-hidden="true"></i>
                            </Col>
                            <Col xs="auto">
                                Available For Marriage
                            </Col>
                        </Row>
                    </Col>
                    <Col md={12}>
                        <Switch className="m-3" />
                    </Col>
                </Row>
                <Divider />


            </Drawer>
        </>
    );
};
export default Setting;
