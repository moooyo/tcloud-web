export const ADD_FILE_TO_FILE_LIST = 'add_file_to_file_list';
export type ADD_FILE_TO_FILE_LIST_TYPE = typeof ADD_FILE_TO_FILE_LIST;
export const CHANGE_FILE_NAME_ID = 'change_file_name_id';
export type CHANGE_FILE_NAME_ID = typeof CHANGE_FILE_NAME_ID;
export const DELETE_FILE_FROM_FILE_LIST = 'delete_file_from_file_list';
export type DELETE_FILE_FROM_LIST_TYPE = typeof DELETE_FILE_FROM_FILE_LIST;
export const UPDATE_CLOUD_STATE = 'update_cloud_state';
export type UPDATE_CLOUD_STATE_TYPE = typeof UPDATE_CLOUD_STATE;
export const CHANGE_LOADING_STATE = 'change_loading';
export type CHANGE_LOADING_STATE_TYPE = typeof CHANGE_LOADING_STATE;
export const SET_LOAD_COUNT_AND_HAS_MORE = 'set_load_count_and_has_more';
export type SET_LOAD_COUNT_AND_HAS_MORE_TYPE = typeof SET_LOAD_COUNT_AND_HAS_MORE;
export const SET_DISPLAY_MODE = 'set_display_mode';
export type SET_DISPLAY_MODE_TYPE = typeof SET_DISPLAY_MODE;
export const SET_SELECTED_ROWS = 'set_selected_rows';
export type SET_SELECTED_ROWS_TYPE = typeof SET_SELECTED_ROWS;
export const SET_SELECTED_ROWS_KEY = 'set_selected_rows_key';
export type SET_SELECTED_ROWS_KEY_TYPE = typeof SET_SELECTED_ROWS_KEY;
export const SET_UPLOAD_LIST = 'set_upload_list';
export type SET_UPLOAD_LIST_TYPE = typeof SET_UPLOAD_LIST;
export const CHANGE_FILE_NAME_FROM_LIST = 'change_file_name_from_list';
export type CHANGE_FILE_NAME_TYPE = typeof CHANGE_FILE_NAME_FROM_LIST;
export const CHANGE_SIDER_MENU = 'change_sider_menu';
export type CHANGE_SIDER_MENU_TYPE = typeof CHANGE_SIDER_MENU;
export const CHANGE_PATH = 'change_path';
export type CHANGE_PATH_TYPE = typeof CHANGE_PATH;
export const SET_FILE_LIST = 'set_file_list';
export type SET_FILE_LIST_TYPE = typeof SET_FILE_LIST;
export const SET_FILE_LIST_LOADING = 'set_file_list_loading';
export type SET_FILE_LIST_LOADING_TYPE = typeof SET_FILE_LIST_LOADING;
export const SET_TRASH_LIST = 'set_trash_list';
export type SET_TRASH_LIST_TYPE = typeof SET_TRASH_LIST;
export const SET_TRASH_STATUS = 'set_trash_status';
export type SET_TRASH_STATUS_TYPE = typeof SET_TRASH_STATUS;
export const SET_TRASH_INIT_LOAD = 'set_trash_init_load';
export type SET_TRASH_INIT_LOAD_TYPE = typeof SET_TRASH_INIT_LOAD;
export const DELETE_TRASH_FROM_LIST = 'delete_trash_from_list';
export type DELETE_TRASH_FROM_LIST_TYPE = typeof DELETE_TRASH_FROM_LIST;
export const SET_ROUTER_ARGS = 'set_router_args';
export type SET_ROUTER_ARGS_TYPE = typeof SET_ROUTER_ARGS;

export interface AddFileToListAction {
  type: ADD_FILE_TO_FILE_LIST_TYPE;
  payload: number;
}

export interface AddFileToUploadListAction {
  type: SET_UPLOAD_LIST_TYPE;
  payload: number;
}

export interface ChangedFileNameAction {
  type: CHANGE_FILE_NAME_ID;
  payload: number;
}

export interface DeleteFileFromListAction {
  type: DELETE_FILE_FROM_LIST_TYPE;
  payload: number;
}

export interface UpdateCloudStateAction {
  type: UPDATE_CLOUD_STATE_TYPE;
  payload: any;
}

export interface ChangeLoadingStateAction {
  type: CHANGE_LOADING_STATE_TYPE;
  payload: boolean;
}

export interface SetLoadCountAndHasMoreAction {
  type: SET_LOAD_COUNT_AND_HAS_MORE_TYPE;
  payload: any;
}

export interface SetDisplayModeAction {
  type: SET_DISPLAY_MODE_TYPE;
  payload: number;
}

export interface SetSelectedRowsAction {
  type: SET_SELECTED_ROWS_TYPE;
  payload: any;
}

export interface SetSelectedRowKeysAction {
  type: SET_SELECTED_ROWS_KEY_TYPE;
  payload: any;
}

export interface ChangeFileNameFromListAction {
  type: CHANGE_FILE_NAME_TYPE;
  payload: any;
}

export interface ChangeSiderMenu {
  type: CHANGE_SIDER_MENU_TYPE;
  payload: any;
}

export interface ChangePathAction {}

export interface SetFileListAction {
  type: SET_FILE_LIST_TYPE;
  payload: any;
}

export interface SetFileListLoadingAction {
  type: SET_FILE_LIST_LOADING_TYPE;
  payload: any;
}

export interface SetTrashListAction {
  type: SET_TRASH_LIST_TYPE;
  payload: any;
}

export interface SetTrashStatusAction {
  type: SET_TRASH_STATUS_TYPE;
  payload: any;
}

export interface SetTrashInitLoadAction {
  type: SET_TRASH_INIT_LOAD_TYPE;
  payload: any;
}

export interface DeleteTrashFromList {
  type: DELETE_TRASH_FROM_LIST_TYPE;
  payload: any;
}

export interface SetRouterArgsAction {
  type: SET_ROUTER_ARGS_TYPE;
  payload: any;
}

export type CloudActions =
  | AddFileToListAction
  | AddFileToUploadListAction
  | ChangedFileNameAction
  | DeleteFileFromListAction
  | UpdateCloudStateAction
  | ChangeLoadingStateAction
  | SetLoadCountAndHasMoreAction
  | SetDisplayModeAction
  | SetSelectedRowsAction
  | SetSelectedRowKeysAction
  | ChangeFileNameFromListAction
  | ChangeSiderMenu
  | SetFileListAction
  | SetFileListLoadingAction
  | SetTrashListAction
  | SetTrashStatusAction
  | SetTrashInitLoadAction
  | DeleteTrashFromList
  | SetRouterArgsAction;
