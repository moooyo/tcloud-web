import React from 'react'
import { Avatar, Card, Spin } from 'antd';
import style from './share.module.css'


class ShareBox extends React.Component<any, any> {

  render() {
    return (
      <div>
        <div className={style.emptyBox}/>
        <Card className={style.shareBox} bordered={true} hoverable={true} loading={false}>
          <div className={style.avatar}>
            <Spin spinning={false}>
              <Avatar shape="square" className={style.img} size={64} src={"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"}/>
            </Spin>
          </div>
          Hello
        </Card>
      </div>
    )
  }
}

export default ShareBox
