import React from 'react'
import {ConfirmForm, RegisterForm} from "@/pages/components/register";
import style from "@/pages/components/register.module.css";

interface urlProps {
  match: {
    isExact: boolean;
    params: any;
    path: string;
    url: string;
  }
  location: any
}

class ep extends React.Component<urlProps, any> {
  render() {
    console.log(this.props);
    let confirm = this.props.location.query.confirm;
    let formType = this.props.location.query.form_type === "1" ? 1 : 0;
    let email = this.props.location.query.email;
    if (confirm !== undefined && confirm === "1" && email !== undefined) {
      return (
        <div className={style.RegisterBox}>
          <div className={style.main}>
            <ConfirmForm formType={formType} email={email}/>
          </div>
        </div>
      )
    } else {
      return (
        <div className={style.RegisterBox}>
          <div className={style.main}>
            <RegisterForm formType={0}/>
          </div>
        </div>
      )
    }
  }
}

export default ep;
