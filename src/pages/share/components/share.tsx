import React from 'react'
import { Avatar, Button, Card, Divider, Spin } from 'antd';
import style from './share.module.css'
import ShareAction from '@/pages/share/components/action';
import FileTable from '@/components/fileTable';
import { routerArgs } from '@/pages/cloud/components/fileAction';
import { demoList, FileInfo } from '@/pages/cloud/components/file';

/*
interface FileInfo {
  ID: number;
  Name: string;
  UpdatedAt: number;
  Size: number;
  MetaID: number;
  IsDirectory: boolean;
  Type: number;
}
 */
const ShareBox = function(props:any) {
  const path:routerArgs = {
    Key: 0,
    Name: "分享"
  }
  const fileList:FileInfo[] = demoList
    return (
      <div>
        <div className={style.emptyBox}/>
        <Card className={style.shareBox} bordered={true} loading={false} hoverable={true}>
          <div className={style.avatar}>
            <Spin spinning={false}>
              <Avatar shape="square" className={style.img} size={64} src={"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"}/>
            </Spin>
          </div>
          <Button type={'link'} danger={true} className={style.cancelShare}>取消分享</Button>
          <div className={style.information}>
            <span>冷瑜</span>
          </div>
          <div className={style.information}>
            <span style={{
              color: "#999",
              fontSize: "12px"
            }}>失效时间:2020年5月10日</span>
          </div>
          <Divider style={{margin: "10px"}}/>
          <ShareAction />
          <div className={style.fileTable}>
          <FileTable
            path={path}
            onSelectRowKeyChanged={(keys:any)=>{console.log(keys)}}
            ChangedFileNameID={-1}
            setSelectRowKeys={(selected: any)=>{console.log(selected)}}
            onChangedFileNameClicked={(id:number)=>{}}
            FileList={fileList}
            Loading={false}
            changeFileName={(id:number,name:string)=>{}}/>
          </div>
        </Card>
      </div>
    )
}

export default ShareBox
