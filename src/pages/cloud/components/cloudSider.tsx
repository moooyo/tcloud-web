import React from 'react'
import { Menu, notification } from 'antd';
import style from './cloud.module.css'
import {
  FileOutlined,
  FileTextOutlined,
  FileImageOutlined,

} from '@ant-design/icons'
import { createFromIconfontCN } from '@ant-design/icons/es';
import { fileInfoUrl, IconFontCnUrl } from '@/_config/.api';
import { FileUnknownOutlined } from '@ant-design/icons/lib';
import { routerArgs } from '@/pages/cloud/components/fileAction';
import { UserInfo } from '@/components/user';
import FileList from '@/components/fileList';
import { FileListType } from '@/components/utils';
import { FileInfo } from '@/pages/cloud/components/file';
const {SubMenu} = Menu;

const IconFont = createFromIconfontCN({
  scriptUrl: IconFontCnUrl
})

interface props {
  user: UserInfo
  changeSiderMenu : (menu:string)=> void
  changeLoadingState: (loading:boolean) => void
  resetSomething: any
  setFileList: (list:FileInfo[]) => void
  changeFileListLoadingState: (loading:boolean) => void
}
const formatPageUrl = (offset:number, limit:number, path:number, type:string) => {
  let typeNumber = 0
  console.log(type);
  switch (type) {
    case "all": typeNumber = 0;break;
    case "doc": typeNumber = FileListType.Doc; break;
    case "picture": typeNumber = FileListType.Image; break;
    case "music": typeNumber = FileListType.Music; break;
    case "video": typeNumber = FileListType.Video; break;
    case "other": typeNumber = FileListType.Other; break;
    default:
      typeNumber = 0
  }


  return (
    fileInfoUrl +
    '?offset=' +
    offset.toString() +
    '&limit=' +
    limit.toString() +
    '&path=' +
    path.toString() +
    "&type=" +
    typeNumber.toString()
  );
};


class CloudSider extends React.Component<props, any> {
  onMenuClick = (e:any) => {
    this.props.changeSiderMenu(e.key)
    //this.props.changeLoadingState(true)
    this.props.resetSomething()
    this.props.changeFileListLoadingState(true)
    const fileUrl = formatPageUrl(0, 30, this.props.user.DiskRoot, e.key)
    fetch(fileUrl).then(res=>res.json()).then(resp=>{
      this.props.setFileList(resp.data)
    }).catch(e=>{
      notification['error']({
        message: "服务器出现了一些问题",
        description: "服务器出现了一些问题，稍后再试试吧"
      })
      console.log(e)
    }).finally(()=>{
      this.props.changeFileListLoadingState(false)
    })
  }
  render() {
    return (
      <div className={style.sider}>
        <Menu
          mode={"inline"}
          onClick={this.onMenuClick}
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
