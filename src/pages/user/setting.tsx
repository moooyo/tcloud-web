import React from 'react';
import { initUserDetail, UserDetailInfo } from '@/components/user';
import { Card, Col, Divider, Row, Spin } from 'antd';
import SettingForm from '@/pages/user/components/SettingForm';
import TodoListManage from '@/pages/user/components/TodoListManage';

interface state {
  user: UserDetailInfo;
  loading: boolean;
}

class UserSetting extends React.Component<any, state> {
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
            <Col span={6} />
            <Col span={12} style={{ paddingRight: '1vw' }}>
              <Card>
                <SettingForm user={this.state.user} />
                <Divider />
                <TodoListManage user={this.state.user} />
              </Card>
            </Col>
          </Row>
          <Col span={6} />
        </Spin>
      </div>
    );
  }
}

export default UserSetting;
