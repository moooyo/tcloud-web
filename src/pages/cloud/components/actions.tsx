import { FileInfo } from '@/pages/cloud/components/file';
import {
  ADD_FILE_TO_FILE_LIST,
  ADD_FILE_TO_FILE_LIST_TYPE,
  CHANGE_FILE_NAME_FROM_LIST,
  CHANGE_FILE_NAME_ID,
  CHANGE_LOADING_STATE,
  CHANGE_LOADING_STATE_TYPE,
  CHANGE_PATH,
  CHANGE_SIDER_MENU,
  DELETE_FILE_FROM_FILE_LIST,
  DELETE_FILE_FROM_LIST_TYPE,
  SET_DISPLAY_MODE,
  SET_DISPLAY_MODE_TYPE,
  SET_FILE_LIST,
  SET_FILE_LIST_LOADING,
  SET_LOAD_COUNT_AND_HAS_MORE,
  SET_LOAD_COUNT_AND_HAS_MORE_TYPE,
  SET_SELECTED_ROWS,
  SET_SELECTED_ROWS_KEY,
  SET_UPLOAD_LIST,
  UPDATE_CLOUD_STATE,
  SET_TRASH_LIST,
  SET_TRASH_INIT_LOAD,
  SET_TRASH_STATUS,
  DELETE_TRASH_FROM_LIST,
  SET_ROUTER_ARGS,
} from '@/pages/cloud/components/type';
import {
  routerArgs,
  UploadFileMeta,
} from '@/pages/cloud/components/fileAction';
import { TrashInfo } from './trash';

export function SetUploadFileList(file: UploadFileMeta[]) {
  return {
    type: SET_UPLOAD_LIST,
    payload: file,
  };
}

export function ChangedFileNameID(id: number) {
  return {
    type: CHANGE_FILE_NAME_ID,
    payload: id,
  };
}

export function DeleteFileFromListID(id: number[]) {
  return {
    type: DELETE_FILE_FROM_FILE_LIST,
    payload: id,
  };
}

export function AddFileToList(file: FileInfo) {
  return {
    type: ADD_FILE_TO_FILE_LIST,
    payload: file,
  };
}

export function UpdateCloudState(payload: any) {
  return {
    type: UPDATE_CLOUD_STATE,
    payload: payload,
  };
}

export function ChangeLoadingState(loading: boolean) {
  return {
    type: CHANGE_LOADING_STATE,
    payload: loading,
  };
}

export function SetLoadCountAndHasMore(count: number, hasMore: boolean) {
  return {
    type: SET_LOAD_COUNT_AND_HAS_MORE,
    payload: {
      Count: count,
      HasMore: hasMore,
    },
  };
}

export function SetDisplayMode(mode: number) {
  return {
    type: SET_DISPLAY_MODE,
    payload: mode,
  };
}

export function SetSelectRows(SelectRows: any) {
  return {
    type: SET_SELECTED_ROWS,
    payload: {
      selectRows: SelectRows,
    },
  };
}

export function SetSelectedRowKeys(selectedRowKeys: any) {
  return {
    type: SET_SELECTED_ROWS_KEY,
    payload: {
      selectedRowKeys: selectedRowKeys,
    },
  };
}

export function ChangeFileNameFromList(ID: number, Name: string) {
  return {
    type: CHANGE_FILE_NAME_FROM_LIST,
    payload: {
      id: ID,
      name: Name,
    },
  };
}

export function ChangeSiderMenu(menu: string) {
  return {
    type: CHANGE_SIDER_MENU,
    payload: menu,
  };
}

export function ChangePath(path: routerArgs) {
  return {
    type: CHANGE_PATH,
    payload: path,
  };
}

export function SetFileList(list: FileInfo[]) {
  return {
    type: SET_FILE_LIST,
    payload: list,
  };
}

export function SetFileListLoading(loading: boolean) {
  return {
    type: SET_FILE_LIST_LOADING,
    payload: loading,
  };
}

export function SetTrashList(list: TrashInfo[]) {
  return {
    type: SET_TRASH_LIST,
    payload: list,
  };
}

export function SetTrashStatus(offset: number, limit: number) {
  return {
    type: SET_TRASH_STATUS,
    payload: {
      offset: offset,
      limit: limit,
    },
  };
}

export function SetTrashInitLoad(load: boolean) {
  return {
    type: SET_TRASH_INIT_LOAD,
    payload: load,
  };
}

export function DeleteTrashFromList(trashID: number[]) {
  return {
    type: DELETE_TRASH_FROM_LIST,
    payload: trashID,
  };
}

export function SetRouterArgs(args: routerArgs[]) {
  return {
    type: SET_ROUTER_ARGS,
    payload: args,
  };
}
