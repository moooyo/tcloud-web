import React from 'react'
import { Breadcrumb, Button, Col, Row } from 'antd';
import style from './share.module.css'
import { DownloadOutlined, SaveOutlined } from '@ant-design/icons';


const ShareAction = function(props:any) {
  return (
    <div>
      <Row>
        <Col span={4} style={{
          display: "flex",
          justifyContent: "center"
        }}>
          <Breadcrumb separator={">"} className={style.breadcrumb}>
            <Breadcrumb.Item>Share</Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={12}/>
        <Col span={8}>
          <div style={{
            display: "flex",
            justifyContent: "flex-end"
          }}>
          <Button type={'primary'} className={style.button} icon={<SaveOutlined />}>保存</Button>
          <Button className={style.button} icon={<DownloadOutlined />}>下载</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ShareAction
