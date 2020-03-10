import React from 'react'
import {Menu} from 'antd'
import style from './cloud.module.css'

const {SubMenu} = Menu;

interface props {

}

interface state {

}

class CloudSider extends React.Component<props, state> {
  render() {

    return (
      <div className={style.sider}>
        <Menu
          mode={"inline"}
        >
          <SubMenu key={"file"} title={"文件"}>
            <Menu.Item key={"picture"}>
              图片
            </Menu.Item>
            <Menu.Item key={"doc"}>
              文档
            </Menu.Item>
            <Menu.Item key={"video"}>
              视频
            </Menu.Item>
            <Menu.Item key={"music"}>
              音乐
            </Menu.Item>
            <Menu.Item key={"other"}>
              其他
            </Menu.Item>
          </SubMenu>
          <Menu.Item key={"course"} title={"课程"}>课程</Menu.Item>
          <Menu.Item key={"knowledge"} title={"知识点"}>知识点</Menu.Item>
          <Menu.Item key={"tag"} title={"标签"}>标签</Menu.Item>
          <Menu.Item key={"share"} title={"分享"}>分享</Menu.Item>
          <Menu.Item key={"trash"} title={"回收站"}>回收站</Menu.Item>
        </Menu>
      </div>
    )
  }

}


export default CloudSider
