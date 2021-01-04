import React from 'react';
import { Row, Col } from 'antd';

const ConfirmComponent = () => {
  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <h1 style={{ textAlign: 'center' }}> Confirm Order</h1>
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={3}>
          <Row>
            <Col span={12}>
              <p>Yeu cau nhap dia chi giao hang</p>
              <p>Yeu cau nhap chu thich (ko bat buoc)</p>
              <p>Nhap ma giam gia (neu co)</p>
            </Col>
            <Col span={12}>
              <p>Hien thi lai thong tin gio hang</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
export default React.memo(ConfirmComponent);