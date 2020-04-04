import React from 'react';
// @ts-ignore
import FileViewer from 'react-file-viewer';
import style from './file.module.css'
import { Button } from 'antd';
import {CloseOutlined} from '@ant-design/icons'
interface props {
  path: string;
  type: string;
}
class FileView extends React.Component<props, any> {
  onError = (e:any) => {
    console.log(e);
  }
  onCloseClick = (e:any) => {
    alert("ok");
  }
  render() {
    return (
      <div className={style.fileViewMask}>
        <div>
          <Button type={'link'} icon={<CloseOutlined />} style={{
            position: 'fixed',
            left: "95vw",
            top: "1vh",
            zIndex: 999,
          }} size={'large'}
          onClick={this.onCloseClick}
          />
        </div>
        <div className={style.fileView}>
          <FileViewer
            fileType = {this.props.type}
            filePath = {this.props.path}
            onError = {this.onError}
            className={style.fileView}
          />
        </div>
      </div>
      )
  }
}
export default FileView
