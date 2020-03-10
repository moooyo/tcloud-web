import React from 'react'
import {Button, Form, Input, Select} from "antd";
import {FormInstance} from "antd/es/form";

const {Option} = Select;

interface props {
  onClick: any
}

interface state {
  type: number
}


const InviteCode = (
  <Form.Item name={"invite"} rules={[{required: true}]}>
    <Input placeholder={"邀请码"}/>
  </Form.Item>
);

class RegisterForm extends React.Component<props, state> {
  formRef = React.createRef<FormInstance>();
  /*
   * 0: student
   * 1: teacher
   */
  state = {
    type: 0
  };

  onFinished = (value: any) => {
    this.props.onClick();
  };

  onSelectionChange = (value: number) => {
    this.setState({
      type: value
    })
  };

  render() {
    return (
      <Form ref={this.formRef} onFinish={this.onFinished}>
        <Form.Item name={"email"} rules={[{required: true, type: "email"}]}>
          <Input placeholder={"邮箱地址"}/>
        </Form.Item>
        <Form.Item name={"password"} rules={[{required: true}]}>
          <Input.Password placeholder={"账户密码"}/>
        </Form.Item>
        {this.state.type !== 0 ? InviteCode : ""}
        <Select placeholder={"用户类型"} onChange={this.onSelectionChange}>
          <Option value={0}>学生</Option>
          <Option value={1}>教师</Option>
        </Select>
        <Button type={"primary"} htmlType={"submit"}>注册</Button>
      </Form>
    )
  }
}

export {RegisterForm};
