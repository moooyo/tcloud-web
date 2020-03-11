import React from "react";
import {Button, Form, Input, Select} from "antd";
import {FormInstance} from "antd/es/form";
import style from './register.module.css'

const {Option} = Select;

interface confirmProps {
  email: string
  formType: number
}

const nickname = (
  <Form.Item name={"nickname"} rules={[{required: true}]}>
    <Input placeholder={"昵称"}/>
  </Form.Item>
);

class ConfirmForm extends React.Component<confirmProps, any> {
  formRef = React.createRef<FormInstance>();
  onFinished = (value: any) => {

  };

  render() {
    return (
      <div className={style.wrap}>
        <div className={style.m1}>
          确认信息
        </div>
        <div className={style.m2}>
          用以完成注册
        </div>
        <Form ref={this.formRef} onFinish={this.onFinished}>
          <Form.Item name={"email"} rules={[{required: true}]}>
            <Input placeholder={"邮箱地址"}/>
          </Form.Item>
          <Form.Item name={"code"} rules={[{required: true}]}>
            <Input placeholder={"注册码"}/>
          </Form.Item>
          {this.props.formType === 1 ? nickname : ""}
        </Form>
      </div>
    )
  }
}


interface props {
}

interface state {
  type: number
  status: number
}

const TeacherCode = (
  <Form.Item name={"code"} rules={[{required: true}]}>
    <Input placeholder={"教师注册码"}/>
  </Form.Item>
);

const InviteCode = (
  <Form.Item name={"invite"} rules={[{required: true}]}>
    <Input placeholder={"班级邀请码"}/>
  </Form.Item>
);

class RegisterForm extends React.Component<props, state> {
  formRef = React.createRef<FormInstance>();
  /*
   * Type
   * 0: student
   * 1: teacher
   * status
   * 0: not set
   * !0: need invite code to join class
   */
  state = {
    type: 0,
    status: 0
  };

  onFinished = (value: any) => {

  };

  onSelectionChange = (value: number) => {
    this.setState({
      type: value
    })
  };
  onClassChange = (value: number) => {
    this.setState({
      status: value
    })
  };

  render() {
    return (
      <div className={style.wrap}>
        <div className={style.m1}>
          请输入邮箱和密码
        </div>
        <div className={style.m2}>
          以进入Account Register
        </div>
        <Form ref={this.formRef} onFinish={this.onFinished}>
          <Form.Item name={"email"} rules={[{required: true, type: "email"}]}>
            <Input placeholder={"邮箱地址"}/>
          </Form.Item>
          <Form.Item name={"password"} rules={[{required: true}]}>
            <Input.Password placeholder={"账户密码"}/>
          </Form.Item>
          <Form.Item name={"username"} rules={[{required: true}]}>
            <Input placeholder={"昵称"}/>
          </Form.Item>
          {
            this.state.type === 0 ? (
              <Form.Item name={"class"} rules={[{required: true}]}>
                <Select placeholder={"班级"} onChange={this.onClassChange}>
                  <Option value={0}>暂不加入</Option>
                  <Option value={1}>软件1601</Option>
                  <Option value={2}>软件1602</Option>
                </Select>
              </Form.Item>
            ) : ""
          }
          {this.state.status !== 0 && this.state.type === 0 ? InviteCode : ""}
          <Form.Item>
            <Select placeholder={"用户类型"} onChange={this.onSelectionChange} defaultValue={0}>
              <Option value={0}>学生</Option>
              <Option value={1}>教师</Option>
            </Select>
          </Form.Item>
          {this.state.type !== 0 ? TeacherCode : ""}
          <Button type={"primary"} htmlType={"submit"} shape={"round"} size={"large"} style={{
            width: "100%"
          }}>继续</Button>
        </Form>
      </div>
    )
  }
}

export {RegisterForm};


export default () => {
  return (
    <div className={style.RegisterBox}>
      <div className={style.main}>
        <RegisterForm/>
      </div>
    </div>
  )
}
