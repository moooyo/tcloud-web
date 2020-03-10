import React from "react";
import {Layout, Spin} from 'antd'
import {errorUser, UserInfo} from "@/components/user";
import {userInfoUrl} from "@/_config/.api";
import MainHeader from '@/components/header'
import CloudSider from "@/components/cloudSider";
import {LoadingOutlined} from '@ant-design/icons'
import FileTable from "@/components/fileTable";
import {FileAction, FileShowLoadData} from "@/components/fileAction";

const {Header, Sider, Content} = Layout;


interface state {
  user: UserInfo
  loading: boolean
}

const actIcon = <LoadingOutlined spin/>;

class Index extends React.Component<any, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: errorUser,
      loading: true
    };
    fetch(userInfoUrl).then(res => res.json()).then(res => {
      this.setState({
        user: res,
        loading: false
      })
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <Spin tip={"加载中..."} spinning={this.state.loading}
            size={"large"} indicator={actIcon} style={{
        top: "40vh"
      }}>
        <div>
          <Layout style={{backgroundColor: "white"}}>
            <Header style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0 2px 6px 0 rgba(0,0,0,.05)",
              position: "fixed",
              width: "100%",
              overflow: "auto"
            }}>
              <MainHeader user={this.state.user}/>
            </Header>
            <Layout style={{
              marginTop: "10vh"
            }}>
              <Sider style={{
                position: "fixed",
                left: "1vw",
                height: "88vh",
                backgroundColor: "white",
                boxShadow: "2px -1px 6px 0 rgba(0,0,0,.05)",
                width: "10vw",
                overflow: "auto"
              }}>
                <CloudSider/>
              </Sider>
              <Content style={{
                backgroundColor: "white",
                width: "84vw",
                height: "88vh",
                boxShadow: "-2px -1px 6px 0 rgba(0,0,0,.05)",
                position: "fixed",
                top: "10vh",
                left: "15vw",
              }}>
                <FileAction/>
                <FileShowLoadData/>
                <FileTable/>
              </Content>
            </Layout>
          </Layout>
        </div>
      </Spin>
    )
  }

}

export default Index
