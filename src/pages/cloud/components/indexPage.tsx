import React from 'react';
import { Layout } from 'antd';
import { errorUser, UserInfo } from '@/components/user';
import { userInfoUrl } from '@/_config/.api';
import FileTable from '@/pages/cloud/components/fileTable';
import {
  FileAction,
  FileShowLoadData,
  routerArgs,
} from '@/pages/cloud/components/fileAction';
import { FileInfo } from '@/pages/cloud/components/file';
import FileList from '@/pages/cloud/components/fileList';

const { Content } = Layout;

interface state {
  user: UserInfo;
  loading: boolean;
  routerArgs: routerArgs[];
  selectRows: FileInfo[];
  hasMore: boolean;
  count: number;
  displayMode: number;
  changedFileNameID: number;
}

class CloudIndex extends React.Component<any, state> {
  state = {
    user: errorUser,
    loading: true,
    routerArgs: [],
    selectRows: [],
    hasMore: true,
    count: 0,
    displayMode: 0,
    changedFileNameID: -1,
  };

  constructor(props: any) {
    super(props);
    fetch(userInfoUrl)
      .then(res => res.json())
      .then(res => {
        this.setState({
          user: res.data,
          loading: false,
          routerArgs: [
            {
              Key: res.data.DiskRoot,
              Name: '我的文件',
            },
          ],
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

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
    this.setState({
      selectRows: selected,
    });
  };

  onSourceChanged = (hasMore: boolean, count: number) => {
    this.setState({
      hasMore: hasMore,
      count: count,
    });
  };

  onShowModeChanged = () => {
    if (this.state.displayMode === 1) {
      this.setState({
        displayMode: 0,
      });
    } else {
      this.setState({
        displayMode: 1,
      });
    }
  };


  onCreateDirectory = (file: FileInfo) => {
    this.setState({
      changedFileNameID: file.ID
    })
  };


  onChangedFileNameClicked = () => {
    if (this.state.selectRows.length !== 1) {
      return;
    } else {
      this.setState({
        //@ts-ignore
        changedFileNameID: this.state.selectRows[0].ID,
      });
    }
  };

  changedFileIDHandle = (id: number) => {
    this.setState({
      changedFileNameID: id,
    });
  };

  render() {
    if (this.state.loading) {
      return null;
    }
    let path = this.state.routerArgs[this.state.routerArgs.length - 1];
    const displayTable = (
      <FileTable
        path={path}
        onSelectRowKeyChanged={this.onSelectKeyChange}
        onSourceChanged={this.onSourceChanged}
        changedFileNameID={this.state.changedFileNameID}
        changedFileNameHandle={this.changedFileIDHandle}
      />
    );
    const displayList = (
      <FileList
        path={path}
        onSelectKeyChanged={this.onSelectKeyChange}
        onSourceChanged={this.onSourceChanged}
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
            selectRows={this.state.selectRows}
            onShowModeChanged={this.onShowModeChanged}
            onChangedFileNameClicked={this.onChangedFileNameClicked}
            onCreateDirectory={this.onCreateDirectory}
          />
          <FileShowLoadData
            args={this.state.routerArgs}
            onClick={this.onRouterClick}
            count={this.state.count}
            hasMore={this.state.hasMore}
          />
          {this.state.displayMode === 0 ? displayTable : displayList}
        </Content>
      </Layout>
    );
  }
}

export default CloudIndex;
