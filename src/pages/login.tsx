import React from "react";
import LoginBox from "@/components/login";
import style from "./login.module.css"

export default () => {
  return (
    <div style={{height: "100%"}}>
      <div className={style.main}>
        <LoginBox></LoginBox>
      </div>
    </div>
  )
}
