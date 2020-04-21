import React from 'react';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  notification,
  Row,
  Select,
  Spin,
} from 'antd';
import style from './login.module.css';
import { forgetPassword, loginUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';
import { FormInstance } from 'antd/lib/form';
import { LoadingOutlined } from '@ant-design/icons';
import { history } from 'umi';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const openLoginFailNotification = (message: string) => {
  // @ts-ignore
  notification['error']({
    message: 'Error',
    description: message,
  });
};

interface state {
  loading: boolean;
}

const { Option } = Select;

class LoginBox extends React.Component<any, state> {
  formRef = React.createRef<FormInstance>();

  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  submit = (values: any) => {
    this.setState({
      loading: true,
    });
    fetch(loginUrl, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(values),
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res.code === ErrorCode.CreateUserByLogin) {
          history.push(
            '/register?email=' + values.email + '&form_type=1&confirm=1',
          );
          notification['success']({
            message: '注册码已发送',
            description:
              '一封带有注册码的邮件已经发送往您的邮箱，您可以在稍后确认。' +
              '如果长时间没有收到这封邮件，您也可以点击按钮再次获取。注意:注册码的有效时间为五分钟！',
          });
        } else if (res.code === ErrorCode.OK) {
          history.push('/cloud');
        } else {
          return openLoginFailNotification(res.message);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    return (
      <div className={style.wrap}>
        <div className={style.box}>
          <div className={style.m1}>登录</div>
          <div className={style.m2}>以进入TCloud</div>
          <Form onFinish={this.submit} ref={this.formRef}>
            <Form.Item
              name={'email'}
              rules={[{ type: 'email', required: true }]}
            >
              <Input placeholder={'邮箱地址'} />
            </Form.Item>
            <Form.Item name={'password'} rules={[{ required: true }]}>
              <Input.Password placeholder={'账户密码'} />
            </Form.Item>
            <Form.Item name={'type'} rules={[{ required: true }]}>
              <Select placeholder={'用户类型'}>
                <Option value={0}>学生</Option>
                <Option value={1}>教师</Option>
              </Select>
            </Form.Item>
            <Form.Item name={'remember'} valuePropName={'checked'}>
              <Row>
                <Col span={8}>
                  <Checkbox>自动登录</Checkbox>
                </Col>
                <Col push={12}>
                  <a href={forgetPassword}>忘记密码</a>
                </Col>
              </Row>
            </Form.Item>
            <Spin indicator={antIcon} spinning={this.state.loading}>
              <Button
                size={'large'}
                block={true}
                type={'primary'}
                shape={'round'}
                htmlType={'submit'}
                className={style.button}
              >
                登录/注册
              </Button>
            </Spin>
          </Form>
        </div>
      </div>
    );
  }
}

export default LoginBox;
