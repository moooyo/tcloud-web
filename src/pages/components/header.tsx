import React from 'react';
import { Avatar, Col, Dropdown, Menu, Row, Spin, notification } from 'antd';
import { UserInfo } from '@/components/user';
import style from './header.module.css';
import {
  CloudOutlined,
  CodeOutlined,
  CommentOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';
import { IconFontCnUrl, loginUrl } from '@/_config/.api';
import { history } from 'umi';
import { ErrorCode } from '@/_config/error';

interface state {
  current: string;
  loading: boolean;
}

interface props {
  user: UserInfo;
}

const IconFont = createFromIconfontCN({
  scriptUrl: IconFontCnUrl,
});

function pathname2current(pathname: string) {
  const pathArray = pathname.split('/');
  return pathArray[1];
}

class MainHeader extends React.Component<props, state> {
  onMenuClick = (val: any) => {
    switch (val.key) {
      case '1':
        history.push('/user/info');
        break;
      case '2':
        history.push('/user/setting');
        break;
      case '3':
        (async () => {
          try {
            this.setState({
              loading: true,
            });
            const res = await fetch(loginUrl, {
              method: 'DELETE',
            });
            const resp = await res.json();
            if (resp.code === ErrorCode.OK) {
              notification['success']({
                message: '注销成功',
                description: '注销成功，现在可以安全的关闭此页面',
              });
              history.push('/login');
            } else {
              notification['error']({
                message: '注销失败',
                description: resp.message,
              });
            }
          } catch (e) {
            console.log(e);
          } finally {
            this.setState({
              loading: false,
            });
          }
        })();
      default:
        console.log(val);
    }
  };

  state = {
    current: pathname2current(history.location.pathname),
    loading: false,
  };

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
      case 'user':
        history.push('/user/info');
        return;
      case 'admin':
        history.push('/admin');
        return;
    }
  };

  render() {
    const menu = (
      <Spin spinning={this.state.loading}>
        <Menu onClick={this.onMenuClick}>
          <Menu.Item key={1}>个人中心</Menu.Item>
          <Menu.Item key={2}>个人设置</Menu.Item>
          <Menu.Divider />
          <Menu.Item key={3}>注销</Menu.Item>
        </Menu>
      </Spin>
    );
    const isTeacher = this.props.user.Type === 1;
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
              style={{ lineHeight: '62px' }}
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode={'horizontal'}
            >
              <Menu.Item key={'cloud'}>
                <CloudOutlined />
                教学资源
              </Menu.Item>
              <Menu.Item
                key={'practise'}
                style={
                  isTeacher
                    ? {
                        display: 'none',
                      }
                    : {}
                }
              >
                <CodeOutlined />
                练习系统
              </Menu.Item>
              <Menu.Item
                key={'user'}
                style={
                  isTeacher
                    ? {
                        display: 'none',
                      }
                    : {}
                }
              >
                <IconFont type={'icon-ico-user-info'} />
                用户中心
              </Menu.Item>
              <Menu.Item
                key={'admin'}
                style={
                  !isTeacher
                    ? {
                        display: 'none',
                      }
                    : {}
                }
              >
                <IconFont type={'icon-admin'} />
                管理中心
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
