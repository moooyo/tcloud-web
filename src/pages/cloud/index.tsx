import React from 'react';
import { connect, Provider } from 'react-redux';
import CloudIndex from '@/pages/cloud/components/indexPage';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import CloudReducer from '@/pages/cloud/components/reducer';
import {
  AddFileToList,
  ChangedFileNameID,
  ChangeFileNameFromList,
  ChangeLoadingState,
  ChangePath,
  ChangeSiderMenu,
  DeleteFileFromListID,
  SetDisplayMode,
  SetFileList,
  SetFileListLoading,
  SetLoadCountAndHasMore,
  SetSelectedRowKeys,
  SetSelectRows,
  SetUploadFileList,
  UpdateCloudState,
  SetTrashList,
  SetTrashStatus,
  SetTrashInitLoad,
  DeleteTrashFromList,
} from '@/pages/cloud/components/actions';
import { FileInfo } from '@/pages/cloud/components/file';
import loadCloudState from '@/pages/cloud/components/init';
import {
  routerArgs,
  UploadFileMeta,
} from '@/pages/cloud/components/fileAction';
import { errorUser } from '@/components/user';
import { TrashInfo } from './components/trash';

const initData = {
  fileList: [],
  changedFileNameID: -1,
  user: errorUser,
  loading: false,
  fileListLoading: false,
  routerArgs: [
    {
      Key: 0,
      Name: 'null',
    },
  ],
  selectRows: [],
  selectedRowKeys: [],
  hasMore: true,
  count: 0,
  displayMode: 0,
  uploadFileList: [],
  siderMenu: 'all',
  trashList: [],
  trashStatus: {
    limit: 30,
    offset: 0,
  },
  trashInitLoad: false,
};
// @ts-ignore
const store = createStore(CloudReducer, initData, composeWithDevTools());

loadCloudState().then(resp => {
  // @ts-ignore
  store.dispatch(UpdateCloudState(resp));
});

const mapStateToProps = (state: any) => {
  return {
    fileList: state.fileList,
    changedFileNameID: state.changedFileNameID,
    user: state.user,
    loading: state.loading,
    routerArgs: state.routerArgs,
    displayMode: state.displayMode,
    selectRows: state.selectRows,
    hasMore: state.hasMore,
    count: state.count,
    selectedRowKeys: state.selectedRowKeys,
    uploadFileList: state.uploadFileList,
    siderMenu: state.siderMenu,
    fileListLoading: state.fileListLoading,
    trashList: state.trashList,
    trashStatus: state.trashStatus,
    trashInitLoad: state.trashInitLoad,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChangedFileNameClicked: (id: number) => dispatch(ChangedFileNameID(id)),
    addFileToFileList: (file: FileInfo) => dispatch(AddFileToList(file)),
    deleteFileFromList: (id: number[]) => dispatch(DeleteFileFromListID(id)),
    setLoadCount: (count: number, hasMore: boolean) =>
      dispatch(SetLoadCountAndHasMore(count, hasMore)),
    setDisplayMode: (mode: number) => dispatch(SetDisplayMode(mode)),
    setSelect: (select: any) => dispatch(SetSelectRows(select)),
    setSelectKeys: (select: any) => dispatch(SetSelectedRowKeys(select)),
    setUploadList: (file: UploadFileMeta[]) =>
      dispatch(SetUploadFileList(file)),
    changeFileName: (id: number, name: string) =>
      dispatch(ChangeFileNameFromList(id, name)),
    changeSiderMenu: (menu: string) => dispatch(ChangeSiderMenu(menu)),
    changeLoadingState: (loading: boolean) =>
      dispatch(ChangeLoadingState(loading)),
    changePath: (path: routerArgs) => dispatch(ChangePath(path)),
    setFileList: (list: FileInfo[]) => dispatch(SetFileList(list)),
    setFileListLoading: (loading: boolean) =>
      dispatch(SetFileListLoading(loading)),
    setTrashList: (list: TrashInfo[]) => dispatch(SetTrashList(list)),
    setTrashStatus: (offset: number, limit: number) =>
      dispatch(SetTrashStatus(offset, limit)),
    setTrashInitLoad: (load: boolean) => dispatch(SetTrashInitLoad(load)),
    deleteTrashFromList: (id: number[]) => dispatch(DeleteTrashFromList(id)),
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(CloudIndex);

export default function() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
