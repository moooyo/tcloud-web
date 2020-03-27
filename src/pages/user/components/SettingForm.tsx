import React from 'react';
import { UserDetailInfo } from '@/components/user';
import { FormInstance } from 'antd/lib/form';
import { Button, Form, Input } from 'antd';

interface props {
  user: UserDetailInfo;
}

interface state {
  upload: UserDetailInfo;
}

const { TextArea } = Input;

class SettingForm extends React.Component<props, any> {
  formRef = React.createRef<FormInstance>();

  render() {
    return (
      <div>
        <Form>
          <Form.Item
            name={'nickname'}
            label={'昵称'}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={'realName'} label={'姓名'}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name={'slogan'} label={'个性签名'}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name={'class'} label={'班级'}>
            <Input />
          </Form.Item>
          <Form.Item name={'type'} label={'用户类型'}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name={'email'} label={'邮箱地址'}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name={'location'} label={'住址'}>
            <TextArea rows={2} />
          </Form.Item>
        </Form>
        <Button>保存</Button>
      </div>
    );
  }
}

export default SettingForm;
