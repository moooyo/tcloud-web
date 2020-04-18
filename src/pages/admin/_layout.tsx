import MainHeaderLayout from '@/pages/components/MainHeaderLayout';

import React from 'react';
import { Layout } from 'antd';
import AdminSider from './components/sider';

const { Sider, Content, Header } = Layout;

export default function(props: any) {
  return (
    <>
      <MainHeaderLayout />
      <Layout>
        <Sider
          style={{
            position: 'fixed',
            left: '1vw',
            height: '88vh',
            backgroundColor: 'white',
            boxShadow: '2px -1px 6px 0 rgba(0, 0, 0, 0.05)',
            width: '10vw',
            top: '10vh',
            userSelect: 'none',
          }}
        >
          <AdminSider />
        </Sider>
        <Content
          style={{
            backgroundColor: 'white',
            width: '84vw',
            height: '88vh',
            boxShadow: '-2px -1px 6px 0 rgba(0, 0, 0, 0.05)',
            position: 'fixed',
            top: '10vh',
            left: '15vw',
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </>
  );
}
