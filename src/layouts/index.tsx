import React, { useEffect } from 'react';
import { Layout } from 'antd';
import MainHeaderLayout from '@/pages/components/MainHeaderLayout';
import { useLocation } from 'umi';

const { Content } = Layout;

const MainLayout = (props: any) => {
  const location = useLocation();
  const path = location.pathname.split('/').filter(e => e !== '');
  switch (path[0]) {
    case 'login':
    case 'register':
    case 'share':
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
