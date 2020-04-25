import React from 'react';
import { Layout, Spin, notification } from 'antd';
import FileTable from '@/components/fileTable';
import {
  FileAction,
  FileShowLoadData,
} from '@/pages/cloud/components/fileAction';
import { FileInfo } from '@/pages/cloud/components/file';
import FileList from '@/components/fileList';
import CloudSider from '@/pages/cloud/components/cloudSider';
import ShareTable from './shareTable';
import CourseContent from './course';
import TagSearch from './tagSearch';
import TrashTable from './trash';
import loadCloudState from './init';
import { fileInfoUrl } from '@/_config/.api';
import { ErrorCode } from '@/_config/error';

const { Content, Sider } = Layout;

class CloudIndex extends React.Component<any, any> {
  componentDidMount() {
    loadCloudState().then(resp => {
      this.props.updateCloudState(resp);
    });
  }

  onRouterClick = (e: any) => {
    let key = e.currentTarget.children[0].innerHTML;
    let id = e.currentTarget.children[1].innerHTML;
    if (key === -1) {
      return;
    } else {
      let args = this.props.routerArgs;
      args = args.slice(0, id + 1);
      (async () => {
        this.props.changeLoadingState(true);
        try {
          const url =
            fileInfoUrl + '?path=' + key.trim() + '&offset=0&limit=30';
          const res = await fetch(url, {
            method: 'GET',
          });
          const resp = await res.json();
          if (resp.code === ErrorCode.OK) {
            this.props.setRouterArgs(args);
            this.props.setFileList(resp.data);
          } else {
            notification['error']({
              message: '加载失败',
              description: resp.message,
            });
          }
        } catch (e) {
          console.log(e);
        } finally {
          this.props.changeLoadingState(false);
        }
      })();
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
    this.props.addFileToFileList(file);
    const { onChangedFileNameClicked } = this.props;
    onChangedFileNameClicked(file.ID);
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
    this.props.setRouterArgs([
      {
        Key: this.props.user.DiskRoot,
        Name: '我的文件',
      },
    ]);
    this.props.setSelect([]);
    this.props.setSelectKeys([]);
  };

  render() {
    const { loading } = this.props;
    const { routerArgs } = this.props;
    const path = routerArgs[0];
    const displayTable = (
      <FileTable
        setFileList={this.props.setFileList}
        changeLoadingState={this.props.changeLoadingState}
        setRouterArgs={this.props.setRouterArgs}
        path={path}
        setSelectRowKeys={this.props.setSelectKeys}
        onSelectRowKeyChanged={this.onSelectKeyChange}
        onChangedFileNameClicked={this.props.onChangedFileNameClicked}
        ChangedFileNameID={this.props.changedFileNameID}
        FileList={this.props.fileList}
        Loading={this.props.fileListLoading}
        changeFileName={this.props.changeFileName}
        showTableAction={true}
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
    const trashContent = (
      <TrashTable
        trashList={this.props.trashList}
        offset={this.props.trashStatus.offset}
        limit={this.props.trashStatus.limit}
        setTrashList={this.props.setTrashList}
        setTrashStatus={this.props.setTrashStatus}
        trashInitLoad={this.props.trashInitLoad}
        setTrashInitLoad={this.props.setTrashInitLoad}
        deleteTrashFromList={this.props.deleteTrashFromList}
      />
    );
    const renderContent = () => {
      switch (this.props.siderMenu) {
        case 'share':
          return shareListContent;
        case 'course':
          return courseContent;
        case 'tag':
          return tagSearchContent;
        case 'trash':
          return trashContent;
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
