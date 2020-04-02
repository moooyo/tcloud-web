import {
  ADD_FILE_TO_FILE_LIST,
  CHANGE_FILE_NAME_ID,
  CHANGE_LOADING_STATE,
  CloudActions,
  SET_SELECTED_ROWS,
  SET_SELECTED_ROWS_KEY,
  SET_UPLOAD_LIST,
  UPDATE_CLOUD_STATE,
} from '@/pages/cloud/components/type';

const CloudReducer = (state = [], action:CloudActions) => {
  switch (action.type) {
    case SET_UPLOAD_LIST:
      return Object.assign({}, state, {
        uploadFileList: action.payload
      })
    case ADD_FILE_TO_FILE_LIST:
      return Object.assign({}, state, {
        AddFile: action.payload
      })
    case CHANGE_FILE_NAME_ID:
      return Object.assign({}, state, {
        changedFileNameID: action.payload
      })
    case UPDATE_CLOUD_STATE:
      return Object.assign({}, state, action.payload)
    case CHANGE_LOADING_STATE:
      return Object.assign({}, state, {
        loading: action.payload
      })
    case SET_SELECTED_ROWS:
      return Object.assign({}, state,
       action.payload
      )
    case SET_SELECTED_ROWS_KEY:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
}



export default CloudReducer
