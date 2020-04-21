import React, { useEffect } from 'react';
import { Layout } from 'antd';
import MainHeaderLayout from '@/pages/components/MainHeaderLayout';

const { Content } = Layout;

const MainLayout = (props: any) => {
  switch (props.location.pathname) {
    case '/login':
    case '/register':
    case '/share':
      return <>{props.children}</>;
    default:
      return (
        <div>
          <MainHeaderLayout />
          <Layout>
            <Content>{props.children}</Content>
          </Layout>
        </div>
      );
  }
};

export default MainLayout;
