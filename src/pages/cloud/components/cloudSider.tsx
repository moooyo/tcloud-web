import React from 'react'
import {Menu} from 'antd'
import style from './cloud.module.css'
import {
  FileOutlined,
  FileTextOutlined,
  FileImageOutlined,

} from '@ant-design/icons'
import { createFromIconfontCN } from '@ant-design/icons/es';
import { IconFontCnUrl } from '@/_config/.api';
import { FileUnknownOutlined } from '@ant-design/icons/lib';
const {SubMenu} = Menu;

const IconFont = createFromIconfontCN({
  scriptUrl: IconFontCnUrl
})

class CloudSider extends React.Component<any, any> {
  render() {

    return (
      <div className={style.sider}>
        <Menu
          mode={"inline"}
        >
          <SubMenu key={"file"} title={<span><FileOutlined/>文件</span>}>
            <Menu.Item key={"all"}>
              <FileOutlined />
              全部
            </Menu.Item>
            <Menu.Item key={"picture"}>
              <FileImageOutlined />
              图片
            </Menu.Item>
            <Menu.Item key={"doc"}>
              <FileTextOutlined />
              文档
            </Menu.Item>
            <Menu.Item key={"video"}>
              <IconFont type={"icon-Video"}/>
              视频
            </Menu.Item>
            <Menu.Item key={"music"}>
              <IconFont type={"icon-Music"}/>
              音乐
            </Menu.Item>
            <Menu.Item key={"other"}>
              <FileUnknownOutlined />
              其他
            </Menu.Item>
          </SubMenu>
          <Menu.Item key={"course"} ><IconFont type={"icon-course-management"}/>课程</Menu.Item>
          <Menu.Item key={"knowledge"} ><IconFont type={"icon-knowledge"}/>知识点</Menu.Item>
          <Menu.Item key={"tag"} ><IconFont type={"icon-tag"}/>标签</Menu.Item>
          <Menu.Item key={"share"} ><IconFont type={"icon-share"}/>分享</Menu.Item>
          <Menu.Item key={"trash"} ><IconFont type={"icon-trash"}/>回收站</Menu.Item>
        </Menu>
      </div>
    )
  }

}


export default CloudSider
