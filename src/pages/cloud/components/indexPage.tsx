import React from 'react';
import { Layout, Spin } from 'antd';
import FileTable from '@/components/fileTable';
import {
  FileAction,
  FileShowLoadData,
  routerArgs,
} from '@/pages/cloud/components/fileAction';
import { FileInfo } from '@/pages/cloud/components/file';
import FileList from '@/components/fileList';
import CloudSider from '@/pages/cloud/components/cloudSider';
import ShareTable from './shareTable';
import CourseContent from './course';
import TagSearch from './tagSearch';

const { Content, Sider } = Layout;

class CloudIndex extends React.Component<any, any> {
  onRouterClick = (e: any) => {
    let key = e.currentTarget.children[0].innerHTML;
    let id = e.currentTarget.children[1].innerHTML;
    if (key === -1) {
      return;
    } else {
      let args = this.state.routerArgs;
      args = args.slice(0, id + 1);
      this.setState({
        routerArgs: args,
      });
    }
  };

  onSelectKeyChange = (selected: FileInfo[]) => {
    const { setSelect } = this.props;
    setSelect(selected);
  };

  onShowModeChanged = () => {
    const { setDisplayMode, displayMode } = this.props;
    setDisplayMode(displayMode === 0 ? 1 : 0);
  };

  onCreateDirectory = (file: FileInfo) => {
    this.setState({
      changedFileNameID: file.ID,
    });
  };

  onChangedFileNameClicked = () => {
    const { onChangedFileNameClicked } = this.props;
    if (this.props.selectRows.length !== 1) {
      return;
    } else {
      onChangedFileNameClicked(this.props.selectRows[0].ID);
    }
  };

  resetWhenSiderClick = () => {
    this.props.onChangedFileNameClicked(-1);
    this.props.changePath({
      Key: this.props.user.DiskRoot,
      Name: '我的文件',
    });
    this.props.setSelect([]);
    this.props.setSelectKeys([]);
  };

  render() {
    const { loading } = this.props;
    const { routerArgs } = this.props;
    const path = routerArgs[0];
    const displayTable = (
      <FileTable
        path={path}
        setSelectRowKeys={this.props.setSelectKeys}
        onSelectRowKeyChanged={this.onSelectKeyChange}
        onChangedFileNameClicked={this.props.onChangedFileNameClicked}
        ChangedFileNameID={this.props.changedFileNameID}
        FileList={this.props.fileList}
        Loading={this.props.fileListLoading}
        changeFileName={this.props.changeFileName}
      />
    );
    const displayList = (
      <FileList path={path} onSelectKeyChanged={this.onSelectKeyChange} />
    );
    const defaultContent = (
      <div>
        <FileAction
          path={path}
          selectRows={this.props.selectRows}
          setSelect={this.props.setSelect}
          onShowModeChanged={this.onShowModeChanged}
          onChangedFileNameClicked={this.onChangedFileNameClicked}
          onCreateDirectory={this.onCreateDirectory}
          uploadFileList={this.props.uploadFileList}
          setUploadList={this.props.setUploadList}
          deleteFileFromList={this.props.deleteFileFromList}
          siderMenu={this.props.siderMenu}
        />
        <FileShowLoadData
          args={this.props.routerArgs}
          onClick={this.onRouterClick}
          count={this.props.count}
          hasMore={this.props.hasMore}
        />
        {this.props.displayMode === 0 ? displayTable : displayList}
      </div>
    );
    const shareListContent = <ShareTable />;
    const courseContent = <CourseContent />;
    const tagSearchContent = <TagSearch />;

    const renderContent = () => {
      switch (this.props.siderMenu) {
        case 'share':
          return shareListContent;
        case 'course':
          return courseContent;
        case 'tag':
          return tagSearchContent;
        default:
          return defaultContent;
      }
    };

    return (
      <Spin spinning={loading}>
        <Layout>
          <Sider
            style={{
              position: 'fixed',
              left: '1vw',
              height: '88vh',
              backgroundColor: 'white',
              boxShadow: '2px -1px 6px 0 rgba(0, 0, 0, 0.05)',
              width: '10vw',
              top: '10vh',
              userSelect: 'none',
            }}
          >
            <CloudSider
              changeSiderMenu={this.props.changeSiderMenu}
              changeLoadingState={this.props.changeLoadingState}
              user={this.props.user}
              resetSomething={this.resetWhenSiderClick}
              setFileList={this.props.setFileList}
              changeFileListLoadingState={this.props.setFileListLoading}
            />
          </Sider>
          <Content
            style={{
              backgroundColor: 'white',
              width: '84vw',
              height: '88vh',
              boxShadow: '-2px -1px 6px 0 rgba(0, 0, 0, 0.05)',
              position: 'fixed',
              top: '10vh',
              left: '15vw',
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Spin>
    );
  }
}

export default CloudIndex;
