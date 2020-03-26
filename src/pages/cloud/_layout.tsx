import React from 'react';
import { Layout } from 'antd';
import MainHeaderLayout from '@/components/MainHeaderLayout';
import CloudSider from '@/components/cloudSider';

const { Content, Sider } = Layout;

class CloudLayout extends React.Component<any, any> {
  render() {
    return (
      <div>
        <MainHeaderLayout />
        <Layout>
          <Sider
            style={{
              position: 'fixed',
              left: '1vw',
              height: '88vh',
              backgroundColor: 'white',
              boxShadow: '2px -1px 6px 0 rgba(0,0,0,.05)',
              width: '10vw',
              top: '10vh',
              userSelect: 'none',
            }}
          >
            <CloudSider />
          </Sider>
          <Content>{this.props.children}</Content>
        </Layout>
      </div>
    );
  }
}

export default CloudLayout;
