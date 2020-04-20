import React, { useState, useEffect } from 'react';
import { CheckLoginStatus } from '@/components/checkLoginStatus';
import { userInfoUrl } from '@/_config/.api';
import { errorUser, UserInfo } from '@/components/user';
import { Layout } from 'antd';
import MainHeader from '@/pages/components/header';

const { Header, Content } = Layout;

const MainHeaderLayout = (props: any) => {
  const [user, setUser] = useState(errorUser);
  useEffect(() => {
    fetch(userInfoUrl)
      .then(res => res.json())
      .then(res => {
        setUser(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <CheckLoginStatus />
      <Layout>
        <Header
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.05)',
            width: '100%',
          }}
        >
          <MainHeader user={user} />
        </Header>
        <Content>{props.children}</Content>
      </Layout>
    </div>
  );
};

export default MainHeaderLayout;
