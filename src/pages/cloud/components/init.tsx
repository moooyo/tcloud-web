import { fileInfoUrl, userInfoUrl } from '@/_config/.api';
import { FileInfo } from '@/pages/cloud/components/file';

const formatPageUrl = (offset:number, limit:number, path:number) => {
  return (
    fileInfoUrl +
    '?offset=' +
    offset.toString() +
    '&limit=' +
    limit.toString() +
    '&path=' +
    path.toString()
  );
};


const loadCloudState = async () => {
  try {
    // Get user info
    const userInfoResp = await fetch(userInfoUrl);
    const userData = await userInfoResp.json();
    const user = userData.data;

    const offset = 0;
    const limit = 100;
    const path = user.DiskRoot;

    const fileListUrl = formatPageUrl(offset, limit, path);
    const fileListResp = await fetch(fileListUrl);
    const fileListData = await fileListResp.json();
    const fileList = fileListData.data;

    return {
      fileList: fileList,
      changedFileNameID: -1,
      user: user,
      loading: false,
      routerArgs:[{
        Key: user.DiskRoot,
        Name: '我的文件',
      }],
      selectRows: [],
      selectedRowKeys: [],
      hasMore: !(fileList.length === 100),
      count: fileList.length,
      displayMode: 0,
      uploadFileList: [],
    }
  } catch (e) {
    console.log(e);
  }

  return {
    loading: true
  }
}

export default loadCloudState;
