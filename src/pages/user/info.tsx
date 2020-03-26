import React from 'react';
import { Card, Col, Divider, Row } from 'antd';
import UserIconCard from '@/pages/user/components/UserIconCard';
import UserApprove from '@/pages/user/components/UserApprove';
import TodoListDisplay from '@/pages/user/components/TodoListDisplay';

class UserInfoPage extends React.Component<any, any> {
  render() {
    return (
      <div
        style={{
          backgroundColor: '#f0f2f5',
          paddingTop: '3vh',
        }}
      >
        <Row>
          <Col span={3} />
          <Col span={6} style={{ paddingRight: '1vw' }}>
            <Card>
              <UserIconCard />
              <Divider />
              <TodoListDisplay />
              <Divider />
              <UserApprove />
            </Card>
          </Col>
          <Col span={12}>
            <Card>1</Card>
          </Col>
        </Row>
        <Col span={3} />
      </div>
    );
  }
}

export default UserInfoPage;
