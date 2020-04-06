import React from 'react';
import { Layout } from 'antd';
import MainHeaderLayout from '@/pages/components/MainHeaderLayout';

const { Content } = Layout;

class CloudLayout extends React.Component<any, any> {
  render() {
    return (
      <div>
        <MainHeaderLayout />
        <Layout>
          <Content>{this.props.children}</Content>
        </Layout>
      </div>
    );
  }
}

export default CloudLayout;
