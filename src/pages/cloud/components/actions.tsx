import { FileInfo } from '@/pages/cloud/components/file';
import {
  ADD_FILE_TO_FILE_LIST,
  ADD_FILE_TO_FILE_LIST_TYPE, CHANGE_FILE_NAME_FROM_LIST,
  CHANGE_FILE_NAME_ID, CHANGE_LOADING_STATE,
  CHANGE_LOADING_STATE_TYPE, DELETE_FILE_FROM_FILE_LIST,
  DELETE_FILE_FROM_LIST_TYPE, SET_DISPLAY_MODE, SET_DISPLAY_MODE_TYPE, SET_LOAD_COUNT_AND_HAS_MORE,
  SET_LOAD_COUNT_AND_HAS_MORE_TYPE, SET_SELECTED_ROWS, SET_SELECTED_ROWS_KEY, SET_UPLOAD_LIST, UPDATE_CLOUD_STATE,
} from '@/pages/cloud/components/type';
import { UploadFileMeta } from '@/pages/cloud/components/fileAction';


export function SetUploadFileList(file: UploadFileMeta[]) {
  return {
    type: SET_UPLOAD_LIST,
    payload: file
  }
}

export function ChangedFileNameID(id: number) {
  return {
    type: CHANGE_FILE_NAME_ID,
    payload: id
  }
}

export function DeleteFileFromListID(id: number[]) {
  return {
    type: DELETE_FILE_FROM_FILE_LIST,
    payload: id
  }
}

export function AddFileToList(file: FileInfo) {
  return {
    type: ADD_FILE_TO_FILE_LIST,
    payload: file
  }
}

export function UpdateCloudState(payload: any) {
  return {
    type: UPDATE_CLOUD_STATE,
    payload: payload
  }
}

export function ChangeLoadingState(loading: boolean) {
  return {
    type: CHANGE_LOADING_STATE,
    payload: loading
  }
}

export function SetLoadCountAndHasMore(count:number, hasMore: boolean) {
  return {
    type: SET_LOAD_COUNT_AND_HAS_MORE,
    payload: {
      Count: count,
      HasMore: hasMore
    }
  }
}

export function SetDisplayMode(mode:number) {
  return {
    type: SET_DISPLAY_MODE,
    payload: mode
  }
}

export function SetSelectRows(SelectRows: any) {
  return {
    type: SET_SELECTED_ROWS,
    payload: {
      selectRows: SelectRows
    }
  }
}

export function SetSelectedRowKeys(selectedRowKeys: any) {
  return {
    type: SET_SELECTED_ROWS_KEY,
    payload: {
      selectedRowKeys: selectedRowKeys
    }
  }
}

export function ChangeFileNameFromList(ID: number, Name: string) {
  return {
    type: CHANGE_FILE_NAME_FROM_LIST,
    payload: {
      id: ID,
      name: Name
    }
  }
}
