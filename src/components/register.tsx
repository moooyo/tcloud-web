import React from 'react'
import {Steps} from "antd";
import {
  LoadingOutlined,
  SafetyCertificateOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserAddOutlined
} from '@ant-design/icons'
import style from './register.module.css'
import {RegisterForm} from "@/components/registerForm";

const {Step} = Steps;

interface props {

}

interface state {
  status: number
}

class Register extends React.Component<props, state> {
  steps = [
    {
      title: "Register",
      icon: <UserAddOutlined/>
    },
    {
      title: "Verification Email",
      icon: <SafetyCertificateOutlined/>
    },
    {
      title: "Complement Information",
      icon: <SolutionOutlined/>
    },
    {
      title: "Done",
      icon: <SmileOutlined/>
    }
  ];
  state = {
    status: 1
  };
  IncreasedStatus = () => {
    let x = this.state.status + 1;
    this.setState({
      status: x
    })
  };

  render() {
    let renderStatus = 0;
    return (
      <div className={style.RegisterBox}>
        <Steps current={this.state.status}>
          {this.steps.map(item => {
            renderStatus = renderStatus + 1;
            let isActive = this.state.status === renderStatus;
            let isFinished = this.state.status > renderStatus;
            return <Step key={item.title} title={item.title}
                         icon={isActive ? <LoadingOutlined/> : item.icon}
                         status={isActive ? "process" : isFinished ? "finish" : "wait"}/>
          })}
        </Steps>
        <RegisterForm onClick={this.IncreasedStatus}/>
      </div>
    )
  }
}

export {Register};
