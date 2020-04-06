import React from 'react';
import { Avatar, Col, Dropdown, Menu, Row } from 'antd';
import { UserInfo } from '@/components/user';
import style from './header.module.css';
import {
  CloudOutlined,
  CodeOutlined,
  CommentOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';
import { IconFontCnUrl } from '@/_config/.api';
import { history } from 'umi';

interface state {
  current: string;
}

interface props {
  user: UserInfo;
}

const menu = (
  <Menu>
    <Menu.Item>个人中心</Menu.Item>
    <Menu.Item>个人设置</Menu.Item>
    <Menu.Divider />
    <Menu.Item>注销</Menu.Item>
  </Menu>
);

const IconFont = createFromIconfontCN({
  scriptUrl: IconFontCnUrl,
});

function pathname2current(pathname:string) {
  const pathArray = pathname.split("/")
  return pathArray[1]
}

class MainHeader extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      current: pathname2current(history.location.pathname),
    };
  }

  handleClick = (e: any) => {
    this.setState({
      current: e.key,
    });
    switch (e.key) {
      case 'cloud':
        history.push('/cloud');
        return;
      case 'practise':
        history.push('/practice');
        return;
      case 'comment':
        history.push('/comment');
        return;
      case 'user':
        history.push('/user/info');
        return;
    }
  };

  render() {
    return (
      <div style={{ userSelect: 'none' }}>
        <Row>
          <Col flex={1}>
            <div className={style.logo}>
              Data Structure and Algorithm Analysis
            </div>
          </Col>
          <Col flex={13}>
            <Menu
              style={{ lineHeight: '64px' }}
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode={'horizontal'}
            >
              <Menu.Item key={'cloud'}>
                <CloudOutlined />
                教学资源
              </Menu.Item>
              <Menu.Item key={'practise'}>
                <CodeOutlined />
                练习系统
              </Menu.Item>
              <Menu.Item key={'comment'}>
                <CommentOutlined />
                讨论区
              </Menu.Item>
              <Menu.Item key={'user'}>
                <IconFont type={'icon-ico-user-info'} />
                用户中心
              </Menu.Item>
            </Menu>
          </Col>
          <Col flex={3} />
          <Col flex={1}>
            <div>
              <Dropdown overlay={menu} placement={'bottomCenter'}>
                <div>
                  <Avatar src={require('@/img/logo.png')} />
                  {this.props.user.Nickname}
                </div>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainHeader;