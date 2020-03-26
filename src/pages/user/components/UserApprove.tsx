import { initUserDetail } from '@/components/user';
import { Col, Row } from 'antd';
import React from 'react';
import style from './user.module.css';

class UserApprove extends React.Component<any, any> {
  render() {
    let user = initUserDetail;
    return (
      <div className={style.userApprove}>
        <Row>
          <Col flex={1}>
            <p className={style.userApproveTitle}>赞同数</p>
            {user.CommentApprove}
          </Col>
          <Col flex={1}>
            <p className={style.userApproveTitle}>创作数</p>
            {user.ArticleCount}
          </Col>
          <Col flex={1}>
            <p className={style.userApproveTitle}>练习数</p>
            {user.PracticeCount}
          </Col>
        </Row>
      </div>
    );
  }
}

export default UserApprove;
