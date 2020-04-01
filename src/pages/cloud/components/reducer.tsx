import { FileInfo } from '@/pages/cloud/components/file';
import { routerArgs } from '@/pages/cloud/components/fileAction';
import { ADD_FILE_TO_FILE_LIST, ADD_FILE_TO_UPLOAD_LIST, CloudActions } from '@/pages/cloud/components/actions';

interface cloudState {
  files: FileInfo[]
  path: routerArgs
  uploadFiles: FileInfo[]
}

const CloudReducer = (state = [], action:CloudActions) => {
  switch (action.type) {
    case ADD_FILE_TO_UPLOAD_LIST:
    case ADD_FILE_TO_FILE_LIST:

    default:
      return state
  }
}

export default CloudReducer
