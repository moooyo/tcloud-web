import React from 'react';
import { Avatar, Col, Dropdown, Menu, Row } from 'antd';
import { UserInfo } from './user';
import style from './header.module.css';
import {
  CloudOutlined,
  CodeOutlined,
  CommentOutlined,
} from '@ant-design/icons';

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

class MainHeader extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      current: 'cloud',
    };
  }

  handleClick = (e: any) => {
    console.log(e);
    this.setState({
      current: e.key,
    });
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
              <Menu.Item>
                <CommentOutlined />
                讨论区
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
