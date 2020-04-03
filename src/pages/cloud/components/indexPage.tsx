import React from 'react';
import { Layout } from 'antd';
import FileTable from '@/pages/cloud/components/fileTable';
import {
  FileAction,
  FileShowLoadData,
} from '@/pages/cloud/components/fileAction';
import { FileInfo } from '@/pages/cloud/components/file';
import FileList from '@/pages/cloud/components/fileList';
import { useStore } from 'react-redux';

const { Content } = Layout;


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
    const {setSelect} = this.props;
    setSelect(selected);
  };


  onShowModeChanged = () => {
    const { setDisplayMode, displayMode } = this.props;
    setDisplayMode(displayMode === 0? 1: 0);
  }



  onCreateDirectory = (file: FileInfo) => {
    this.setState({
      changedFileNameID: file.ID
    })
  };

  onChangedFileNameClicked = () => {
    const {onChangedFileNameClicked} = this.props;
    if (this.props.selectRows.length !== 1) {
      return;
    } else {
      onChangedFileNameClicked(this.props.selectRows[0].ID);
    }
  };


  render() {
    const {loading} = this.props;
    if (loading) {
      return (<></>);
    }
    const {routerArgs} = this.props;
    const path = routerArgs[0];
    const displayTable = (
      <FileTable
        path={path}
        setSelectRowKeys={this.props.setSelectKeys}
        onSelectRowKeyChanged={this.onSelectKeyChange}
        onChangedFileNameClicked={this.props.onChangedFileNameClicked}
        ChangedFileNameID={this.props.changedFileNameID}
        FileList={this.props.fileList}
        Loading={this.props.loading}
        changeFileName={this.props.changeFileName}
      />
    );
    const displayList = (
      <FileList
        path={path}
        onSelectKeyChanged={this.onSelectKeyChange}
      />
    );
    return (
      <Layout>
        <Content
          style={{
            backgroundColor: 'white',
            width: '84vw',
            height: '88vh',
            boxShadow: '-2px -1px 6px 0 rgba(0,0,0,.05)',
            position: 'fixed',
            top: '10vh',
            left: '15vw',
          }}
        >
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
          />
          <FileShowLoadData
            args={this.props.routerArgs}
            onClick={this.onRouterClick}
            count={this.props.count}
            hasMore={this.props.hasMore}
          />
          {this.props.displayMode === 0 ? displayTable : displayList}
        </Content>
      </Layout>
    );
  }
}

export default CloudIndex;
