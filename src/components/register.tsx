import React from "react";
import {Button, Form, Input, notification, Select} from "antd";
import {FormInstance} from "antd/es/form";
import style from './register.module.css'

const {Option} = Select;

interface confirmProps {
  email: string
  formType: number
}

interface confirmState {
  countdown: number
}
const nickname = (
  <Form.Item name={"nickname"} rules={[{required: true}]}>
    <Input placeholder={"昵称"}/>
  </Form.Item>
);

class ConfirmForm extends React.Component<confirmProps, confirmState> {
  state = {
    countdown: 5
  };
  formRef = React.createRef<FormInstance>();
  timer: NodeJS.Timeout;

  constructor(props: any) {
    super(props);
    this.timer = setInterval(() => {
      let count = this.state.countdown;
      if (count > 0) {
        this.setState({
          countdown: count - 1
        })
      } else {
        clearInterval(this.timer);
      }
    }, 1000)

  }

  onFinished = (value: any) => {

  };

  onSendClick = () => {
    //todo call send email api

    notification['warning']({
      message: "注册码已发送",
      description: "注册码已经重新投递到您的邮箱，请您在稍后确认这封邮件，如果多次重试均无法获得注册码，请联系管理员。注意：注册码有效期只有5分钟。"
    })

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
            <Input placeholder={"邮箱地址"} defaultValue={this.props.email} disabled={true}/>
          </Form.Item>
          <Form.Item name={"code"} rules={[{required: true}]}>
            <div>
              <Input placeholder={"注册码"} style={{width: "60%", marginRight: "1vw"}}/>
              <Button type={"primary"} style={{width: "35%"}} disabled={this.state.countdown > 0}
                      onClick={this.onSendClick}>
                {this.state.countdown > 0 ? this.state.countdown + "秒后重新发送" : "重新发送"}
              </Button>
            </div>
          </Form.Item>
          {this.props.formType === 1 ? nickname : ""}
          <Button type={"primary"} htmlType={"submit"} size={"large"}
                  shape={"round"} style={{width: "100%"}}>确认</Button>
        </Form>
      </div>
    )
  }
}


interface props {
  formType: number
}

interface state {
  type: number
  status: number
  step: number
  email: string
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
    status: 0,
    step: 0,
    email: ""
  };

  onFinished = (value: any) => {
    //todo: send data to web server


    notification['success']({
      message: "注册码已发送",
      description: "一封带有注册码的邮件已经发送往您的邮箱，您可以在稍后确认。" +
        "如果长时间没有收到这封邮件，您也可以点击按钮再次获取。注意:注册码的有效时间为五分钟！",
      duration: 0
    });

    this.setState({
      email: value.email,
      step: 1
    })
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
    if (this.state.step === 0) {
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
    } else {
      return (
        <ConfirmForm email={this.state.email} formType={0}/>
      )
    }
  }
}

/*
export default () => {
  return (
    <div className={style.RegisterBox}>
      <div className={style.main}>
        <RegisterForm formType={0}/>
      </div>
    </div>
  )
}*/

export default () => {
  return (
    <div className={style.RegisterBox}>
      <div className={style.main}>
        <ConfirmForm formType={0} email={"lengyuchn@qq.com"}/>
      </div>
    </div>
  )
}
