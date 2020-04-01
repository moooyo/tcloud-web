import React from 'react';
import { CheckLoginStatus } from '@/components/checkLoginStatus';
import { userInfoUrl } from '@/_config/.api';
import { errorUser, UserInfo } from '@/components/user';
import { Layout } from 'antd';
import MainHeader from '@/pages/components/header';

const { Header, Content } = Layout;

interface state {
  user: UserInfo;
}

class MainHeaderLayout extends React.Component<any, state> {
  state = {
    user: errorUser,
  };

  constructor(props: any) {
    super(props);
    fetch(userInfoUrl)
      .then(res => res.json())
      .then(res => {
        this.setState({
          user: res.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <CheckLoginStatus />
        <Layout>
          <Header
            style={{
              backgroundColor: '#FFFFFF',
              boxShadow: '0 2px 6px 0 rgba(0,0,0,.05)',
              width: '100%',
            }}
          >
            <MainHeader user={this.state.user} />
          </Header>
          <Content>{this.props.children}</Content>
        </Layout>
      </div>
    );
  }
}

export default MainHeaderLayout;
