// hien thi giao dien nguoi dung chua la thanh vien hoac la chua login vao website
import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const CheckOutComponent = () => {
  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <h1 style={{ textAlign: 'center' }}>Checkout</h1>
        </Col>
      </Row>
      <Row>
        <Col span={18} offset={3}>
          <Row>
            <Col span={12}>
              <h3>Vui long xac nhan cac thong tin</h3>
            </Col>
            <Col span={12}>
              <p>Neu co da co tai khoan bam vao <Link to="/login"> day </Link>  de dang nhap</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
export default React.memo(CheckOutComponent);
