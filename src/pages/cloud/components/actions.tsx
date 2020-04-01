import { FileInfo } from '@/pages/cloud/components/file';

export const ADD_FILE_TO_FILE_LIST = "add_file_to_file_list";
export type ADD_FILE_TO_FILE_LIST_TYPE = typeof ADD_FILE_TO_FILE_LIST;
export const ADD_FILE_TO_UPLOAD_LIST = "add_file_to_upload_list";
export type ADD_FILE_TO_UPLOAD_LIST_TYPE = typeof ADD_FILE_TO_UPLOAD_LIST;

export interface AddFileToListAction {
  type: ADD_FILE_TO_FILE_LIST_TYPE
}

export interface AddFileToUploadListAction {
  type: ADD_FILE_TO_UPLOAD_LIST_TYPE
}

export type CloudActions = AddFileToListAction | AddFileToUploadListAction


export function AddFileToList(file: FileInfo) {
  return {
    type: ADD_FILE_TO_FILE_LIST,
    file
  }
}

export function AddFileToUpload(file: FileInfo) {
  return {
    type: ADD_FILE_TO_UPLOAD_LIST,
    file
  }
}
