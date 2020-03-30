import React from 'react';
import { UserDetailInfo } from '@/components/user';
import { FormInstance } from 'antd/lib/form';
import { Button, Form, Input, Row, Col, Select } from 'antd';

interface props {
  user: UserDetailInfo;
}

interface state {
  upload: UserDetailInfo;
}
const { Option } = Select;
const { TextArea } = Input;

class SettingForm extends React.Component<props, any> {
  formRef = React.createRef<FormInstance>();

  render() {
    return (
      <div>
        <Form>
          <Row gutter={5}>
            <Col span={8}>
              <Form.Item
                name={'nickname'}
                label={'昵称'}
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={'realName'} label={'姓名'}>
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={'class'} label={'班级'}>
                <Select>
                  <Option value={1}>软件1064班</Option>
                  <Option value={2}>软件卓越1601班</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={8}>
              <Form.Item name={'type'} label={'用户类型'}>
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item name={'email'} label={'邮箱地址'}>
                <Input disabled={true} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name={'location'} label={'住址'}>
            <Input />
          </Form.Item>
          <Form.Item
            name={'slogan'}
            label={'个性签名'}
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
        <Row gutter={10}>
          <Col flex={1}>
            <Button style={{ width: '100%' }} type={'primary'}>
              保存
            </Button>
          </Col>
          <Col flex={1}>
            <Button style={{ width: '100%' }}>重置</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

// @ts-ignore
export default SettingForm;
