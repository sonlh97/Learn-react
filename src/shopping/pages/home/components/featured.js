import React from 'react';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//import { push } from 'connected-react-router';
import * as reselect from '../reselect/home-reselect';
import { Row, Col } from 'antd';
import ListItems from './list-item';
//import history from '../../../helpers/history';

const FeaturedPage = () => {
  // console.log(localStorage);
  // const local = localStorage['persist:token-login-persist'];
  // console.log(JSON.parse(local));

  // const dispatch = useDispatch();
  const {loadingPd, featuredPd } = useSelector(createStructuredSelector({
    loadingPd: reselect.loadingProductSelector,
    featuredPd: reselect.featuredSelector
  }));

  return (
    <>
      <Row style={{margin: '10px 0px'}}>
        <Col span={24}>
          <h2 style={{textAlign: 'center', margin: '10px 0px'}}>Featured Products</h2>
          {/* <Button
            type="primary"
            onClick={() => dispatch(push('/login')) }
          > Login </Button>
          <br/>
          <Button
            type="primary"
            onClick={() => history.push('/cart')}
          > Cart</Button> */}
        </Col>
      </Row>
      <ListItems
        loading={loadingPd}
        data={featuredPd}
      />
    </>
  )
}
export default React.memo(FeaturedPage);