import React from 'react';
import { Card, Col, Divider, Row, Spin } from 'antd';
import UserIconCard from '@/pages/user/components/UserIconCard';
import UserApprove from '@/pages/user/components/UserApprove';
import TodoListDisplay from '@/pages/user/components/TodoListDisplay';
import UserFeed from '@/pages/user/components/UserFeed';
import { initUserDetail, UserDetailInfo } from '@/components/user';

interface state {
  user: UserDetailInfo;
  loading: boolean;
}

class UserInfoPage extends React.Component<any, state> {
  state = {
    user: initUserDetail,
    loading: false,
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: '#f0f2f5',
          paddingTop: '3vh',
        }}
      >
        <Spin spinning={this.state.loading}>
          <Row>
            <Col span={3} />
            <Col span={6} style={{ paddingRight: '1vw' }}>
              <Card>
                <UserIconCard />
                <Divider />
                <TodoListDisplay user={this.state.user} />
                <Divider />
                <UserApprove />
              </Card>
            </Col>
            <Col span={12}>
              <UserFeed />
            </Col>
          </Row>
          <Col span={3} />
        </Spin>
      </div>
    );
  }
}

export default UserInfoPage;
