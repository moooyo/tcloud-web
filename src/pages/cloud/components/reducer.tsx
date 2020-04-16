import {
  ADD_FILE_TO_FILE_LIST,
  CHANGE_FILE_NAME_FROM_LIST,
  CHANGE_FILE_NAME_ID,
  CHANGE_LOADING_STATE,
  CHANGE_SIDER_MENU,
  CloudActions,
  DELETE_FILE_FROM_FILE_LIST,
  SET_DISPLAY_MODE,
  SET_FILE_LIST,
  SET_SELECTED_ROWS,
  SET_SELECTED_ROWS_KEY,
  SET_UPLOAD_LIST,
  UPDATE_CLOUD_STATE,
  SET_TRASH_LIST,
  SET_TRASH_STATUS,
  SET_TRASH_INIT_LOAD,
  DELETE_TRASH_FROM_LIST,
} from '@/pages/cloud/components/type';
import { SetTrashStatus } from './actions';

const CloudReducer = (state = [], action: CloudActions) => {
  switch (action.type) {
    case SET_UPLOAD_LIST:
      return Object.assign({}, state, {
        uploadFileList: action.payload,
      });
    case ADD_FILE_TO_FILE_LIST:
      return Object.assign({}, state, {
        AddFile: action.payload,
      });
    case CHANGE_FILE_NAME_ID:
      return Object.assign({}, state, {
        changedFileNameID: action.payload,
      });
    case UPDATE_CLOUD_STATE:
      return Object.assign({}, state, action.payload);
    case CHANGE_LOADING_STATE:
      return Object.assign({}, state, {
        loading: action.payload,
      });
    case SET_SELECTED_ROWS:
      return Object.assign({}, state, action.payload);
    case SET_SELECTED_ROWS_KEY:
      return Object.assign({}, state, action.payload);
    case CHANGE_FILE_NAME_FROM_LIST:
      // @ts-ignore
      let fileList = state.fileList.slice();
      const index = fileList.findIndex((e: { ID: any }) => {
        return e.ID === action.payload.id;
      });
      if (index !== -1) {
        fileList[index].Name = action.payload.name;
      }
      return Object.assign({}, state, {
        fileList: fileList,
      });
    case DELETE_FILE_FROM_FILE_LIST: {
      // @ts-ignore
      let fileList = state.fileList.slice();
      for (let i in fileList) {
        // @ts-ignore
        const index = action.payload.findIndex(e => {
          return e === fileList[i].ID;
        });
        if (index !== -1) {
          delete fileList[i];
        }
      }
      fileList = fileList.filter((e: any) => e !== undefined);
      return Object.assign({}, state, {
        fileList: fileList,
      });
    }
    case SET_DISPLAY_MODE:
      return Object.assign({}, state, {
        displayMode: action.payload,
      });
    case CHANGE_SIDER_MENU:
      return Object.assign({}, state, {
        siderMenu: action.payload,
      });
    case SET_FILE_LIST:
      return Object.assign({}, state, {
        fileList: action.payload,
      });
    case SET_TRASH_LIST:
      //@ts-ignore
      let nextList = state.trashList.slice();
      for (let x of action.payload) {
        nextList.push(x);
      }
      return Object.assign({}, state, {
        trashList: nextList,
      });
    case SET_TRASH_STATUS:
      return Object.assign({}, state, {
        trashStatue: {
          limit: action.payload.limit,
          offset: action.payload.offset,
        },
      });
    case SET_TRASH_INIT_LOAD:
      return Object.assign({}, state, {
        trashInitLoad: action.payload,
      });
    case DELETE_TRASH_FROM_LIST:
      // @ts-ignore
      let list = state.trashList.slice();
      for (let id of action.payload) {
        const index = list.findIndex((e: any) => {
          return e.ID == id;
        });
        if (index !== -1) {
          delete list[index];
        }
      }
      const trashList = list.filter((e: any) => e !== undefined);
      return Object.assign({}, state, {
        trashList: trashList,
      });

    default:
      return state;
  }
};

export default CloudReducer;
