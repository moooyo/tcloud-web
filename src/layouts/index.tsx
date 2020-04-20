import React, { useEffect } from 'react';
import { Layout } from 'antd';
import MainHeaderLayout from '@/pages/components/MainHeaderLayout';

const { Content } = Layout;

const MainLayout = (props: any) => {
  return (
    <div>
      <MainHeaderLayout />
      <Layout>
        <Content>{props.children}</Content>
      </Layout>
    </div>
  );
};

export default MainLayout;
